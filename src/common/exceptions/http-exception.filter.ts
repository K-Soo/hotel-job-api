import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

type ResponseMessage = {
  message: string[];
  error: string;
  statusCode: number;
  customCode?: number;
  timestamp: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpException.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const domain = request.headers;
    // console.log('domain: ', domain);

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ResponseMessage | string;
    const { message, customCode } = this.extractCustomResponse(exceptionResponse);

    this.logger.error(
      `origin: ${domain.origin}, ${request.method} ${request.url}, status: ${customCode || status}, message: ${exception.message}`,
    );

    response.status(status).json({
      success: false,
      error: {
        code: customCode ? `ERR-${customCode}` : `ERR-${status}`,
        message,
      },
      result: null,
      timestamp: new Date().toISOString(),
    });
  }

  private extractCustomResponse(response: ResponseMessage | string): { message: string; customCode?: number } {
    if (typeof response === 'string') {
      return { message: response };
    }

    const { message, customCode } = response;

    // Internal Server Error
    if (customCode?.toString().startsWith('5')) {
      return { message: 'An unexpected error occurred.', customCode };
    }

    // Database Error
    if (customCode?.toString().startsWith('6')) {
      return { message: 'An unexpected error occurred.', customCode };
    }

    const formattedMessage = Array.isArray(message) ? message.join(', ') : message;

    return { message: formattedMessage, customCode };
  }
}
