import { BadRequestException, Logger } from '@nestjs/common';
import { customHttpException } from '../constants/custom-http-exception';

const logger = new Logger('Database');

export async function safeQuery<T>(queryFn: () => Promise<T>): Promise<T | null> {
  try {
    return await queryFn();
  } catch (error) {
    logger.error(`${error.name} - ${error.message}`);

    if (error.status === 400) {
      throw new BadRequestException(error.message);
    }
    throw new BadRequestException(customHttpException.DATABASE_OPERATION_FAILED);
  }
}
