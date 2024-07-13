import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponseT } from '../api.response.zod.schema.generator';
import { Request } from 'express';

@Injectable()
export class ResponseTransformerInterceptor<T> implements NestInterceptor<T, ApiResponseT> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseT> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest<Request>();
    request.startTime = now;

    return next.handle().pipe(
      map((data) => ({
        path: request.url,
        data: data,
        error: null,
        responseTime: Date.now() - now + 'ms',
      })),
    );
  }
}
