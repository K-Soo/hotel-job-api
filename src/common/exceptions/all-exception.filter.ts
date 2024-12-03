import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name);

	constructor(private httpAdapterHost: HttpAdapterHost) {}

	catch(exception: any, host: ArgumentsHost) {
		const { httpAdapter } = this.httpAdapterHost;
		const ctx = host.switchToHttp();

		const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
		this.logger.error(`stack: ${exception.stack}`);

		const responseBody = {
			success: false,
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			error: {
				code: `ERR-${HttpStatus.INTERNAL_SERVER_ERROR}`,
				message: 'Internal server error',
			},
			result: null,
			timestamp: new Date().toISOString(),
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
