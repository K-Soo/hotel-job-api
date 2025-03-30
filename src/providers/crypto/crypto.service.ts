import { Injectable, BadRequestException } from '@nestjs/common';
import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  private readonly cryptoKey: Buffer;
  private readonly ivLength = 16; // AES는 16바이트 IV 필요

  constructor(private readonly configService: ConfigService) {
    const key = this.configService.get<string>('CRYPTO_KEY');
    if (!key) {
      throw new Error('Crypto key is not defined in the environment variables.');
    }
    const keyBuffer = Buffer.from(key, 'utf-8');
    if (keyBuffer.length !== 32) {
      throw new Error('CRYPTO_KEY must be exactly 32 bytes for AES-256.');
    }

    this.cryptoKey = keyBuffer;
  }

  // AES 암호화 (고정 IV)
  encryptionAES(plainText: string | number): string {
    if (!plainText) {
      throw new BadRequestException('Data is required for encryption.');
    }

    // 평문 기반 고유 IV 생성
    const iv = this.generateDeterministicIV(plainText.toString());

    const cipher = createCipheriv('aes-256-cbc', this.cryptoKey, iv);
    const encrypted = Buffer.concat([cipher.update(plainText.toString(), 'utf8'), cipher.final()]);

    const base64 = `${iv.toString('base64')}:${encrypted.toString('base64')}`;
    return this.toUrlSafeBase64(base64);
  }

  decryptionAES(cipherText: string): string {
    if (!cipherText) {
      throw new BadRequestException('Cipher text is required for decryption.');
    }

    try {
      // URL-safe Base64 복원
      const base64 = this.fromUrlSafeBase64(cipherText);

      // 암호화된 데이터에서 IV와 암호화 데이터를 분리
      const [ivBase64, encryptedDataBase64] = base64.split(':');
      if (!ivBase64 || !encryptedDataBase64) {
        throw new Error('Invalid cipher text format.');
      }

      const iv = Buffer.from(ivBase64, 'base64');
      const encryptedData = Buffer.from(encryptedDataBase64, 'base64');

      const decipher = createDecipheriv('aes-256-cbc', this.cryptoKey, iv);

      const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

      return decrypted.toString('utf8');
    } catch {
      throw new BadRequestException('Decryption failed. Invalid cipher text.');
    }
  }

  // AES 암호화 (IV 포함)
  encryptionAESWithIV(plainText: string | number): string {
    if (!plainText) {
      throw new BadRequestException('Data is required for encryption.');
    }

    const iv = randomBytes(this.ivLength); // 초기화 벡터 생성
    const cipher = createCipheriv('aes-256-cbc', this.cryptoKey, iv);

    const encrypted = Buffer.concat([cipher.update(plainText.toString(), 'utf8'), cipher.final()]);

    // IV와 암호화 데이터를 Base64로 결합한 뒤 URL-safe로 변환
    const base64 = `${iv.toString('base64')}:${encrypted.toString('base64')}`;
    return this.toUrlSafeBase64(base64);
  }

  // AES 복호화 (IV 포함 데이터 처리)
  decryptionAESWithIV(cipherText: string): string {
    if (!cipherText) {
      throw new BadRequestException('Cipher text is required for decryption.');
    }

    try {
      // URL-safe Base64 복원
      const base64 = this.fromUrlSafeBase64(cipherText);

      // 암호화된 데이터에서 IV와 암호화 데이터를 분리
      const [ivBase64, encryptedDataBase64] = base64.split(':');
      if (!ivBase64 || !encryptedDataBase64) {
        throw new Error('Invalid cipher text format.');
      }

      const iv = Buffer.from(ivBase64, 'base64');
      const encryptedData = Buffer.from(encryptedDataBase64, 'base64');

      const decipher = createDecipheriv('aes-256-cbc', this.cryptoKey, iv);

      const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

      return decrypted.toString('utf8');
    } catch (error) {
      throw new BadRequestException('Decryption failed. Invalid cipher text.');
    }
  }

  // 평문 기반의 고유한 IV 생성
  private generateDeterministicIV(data: string): Buffer {
    const hash = createHash('sha256').update(data).digest('hex');
    return Buffer.from(hash.slice(0, this.ivLength * 2), 'hex'); // IV는 16바이트 고정
  }

  // Base64 → URL-safe Base64 변환
  private toUrlSafeBase64(base64: string): string {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // URL-safe Base64 → Base64 복원
  private fromUrlSafeBase64(urlSafeBase64: string): string {
    return urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');
  }
}
