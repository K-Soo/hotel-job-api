import * as crypto from 'crypto';

export async function makeSignature(hash_data: any, pemKey: string, cryptoPassword: string): Promise<string> {
  try {
    const sign = crypto.createSign('sha256');
    sign.update(hash_data);

    const signature = sign.sign(
      {
        format: 'pem',
        key: pemKey,
        passphrase: cryptoPassword,
      },
      'base64',
    );

    return signature;
  } catch (error) {
    console.error('Error during signature generation:', error);
    throw error;
  }
}
