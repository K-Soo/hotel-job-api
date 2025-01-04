import { Injectable, Logger } from '@nestjs/common';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

@Injectable()
export class SecretsManagerService {
  private readonly client: SecretsManagerClient;
  private readonly logger = new Logger(SecretsManagerService.name);

  constructor() {
    this.client = new SecretsManagerClient({ region: 'ap-northeast-2', logger: console });
  }

  async getSecret(secretName: string): Promise<string> {
    try {
      const command = new GetSecretValueCommand({ SecretId: secretName });
      const response = await this.client.send(command);

      if (response.SecretString) {
        return response.SecretString;
      }

      this.logger.error('SecretString is undefined');
      throw new Error('SecretString is undefined');
    } catch (error) {
      this.logger.error(`Failed to fetch secret: ${error.message}`, error.stack);
      throw error;
    }
  }
}
