import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`REQ ${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
    const now = Date.now();

    // express-logging-response-body
    const originSend = res.send;
    res.send = (content) => {
      const responseData = {
        input: req.body || {},
        output: content,
      };
      res.send = originSend;

      this.logger.log(
        `RES ${req.ip} ${req.method} ${req.originalUrl} ${res.statusCode} +${
          Date.now() - now
        }ms ${JSON.stringify(responseData)}`,
      );

      return res.send(content);
    };
    next();
  }
}
