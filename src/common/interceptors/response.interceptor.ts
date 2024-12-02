import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class ResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          result: data,
          timestamp: new Date().toISOString(),
          status: 200,
        };
      }),
    );
  }
}
