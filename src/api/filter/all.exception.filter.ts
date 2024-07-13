import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponseSchemaT, DefaultErrorSchemaT } from '../api.response.zod.schema.generator';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (!(exception instanceof HttpException)) {
      exception = new InternalServerErrorException(exception.name, {
        cause: exception,
        description: exception.message,
      });
    }

    const statusCode = (exception as HttpException).getStatus();
    let errorResponse = (exception as HttpException).getResponse();
    if (typeof errorResponse === 'string') {
      errorResponse = {
        code: statusCode,
        message: errorResponse,
      };
    } else {
      if (!errorResponse['code']) {
        errorResponse['code'] = statusCode;
      }
      delete errorResponse['statusCode'];
    }
    // 미사용 key 제거
    delete errorResponse['error'];

    const errorMessage = { url: request.url, body: request.body, response: errorResponse };
    this.logger.error(JSON.stringify(errorMessage), exception.stack);

    const responseTime = request.startTime ? Date.now() - request.startTime : 0;

    const payload: ApiErrorResponseSchemaT = {
      path: request.url,
      data: null,
      error: errorResponse as DefaultErrorSchemaT,
      responseTime: responseTime + 'ms',
    };

    response.status(statusCode).json(payload);
  }
}
