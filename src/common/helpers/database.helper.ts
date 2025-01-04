import { BadRequestException, Logger } from '@nestjs/common';
import { customHttpException } from '../constants/custom-http-exception';

const logger = new Logger('Database');

export async function safeQuery<T>(queryFn: () => Promise<T>): Promise<T | null> {
  try {
    return await queryFn();
  } catch (error) {
    const log = {
      name: error.name,
      message: error.message,
    };
    logger.error(JSON.stringify(log));

    if (error.status === 400) {
      throw new BadRequestException(error.message);
    }

    throw new BadRequestException(customHttpException.DATABASE_OPERATION_FAILED);
  }
}
