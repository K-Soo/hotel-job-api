import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(
    private dto: ClassConstructor<T>,
    private readonly options?: { groups?: string[] },
  ) {}

  intercept(_: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        if (data.items && Array.isArray(data.items)) {
          return {
            ...data,
            items: data.items.map((item) =>
              plainToInstance(this.dto, item, {
                groups: this.options?.groups || [],
                excludeExtraneousValues: true, // @Expose 데코레이터가 없는 필드 제외
              }),
            ),
          };
        }

        return plainToInstance(this.dto, data, {
          groups: this.options?.groups || [],
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
