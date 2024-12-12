import { Logger } from '@nestjs/common';

const logger = new Logger('Database');

export async function safeQuery<T>(queryFn: () => Promise<T>): Promise<T | null> {
  try {
    return await queryFn();
  } catch (error) {
    logger.error(`safeQuery - ${error.name} - ${error.message}`);
    return null;
  }
}
