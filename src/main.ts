import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformerInterceptor } from './api/interceptor/response.transformer.interceptor';
import { WinstonLoggerConfigService } from './config/logger/winston.logger.config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WinstonLoggerConfigService));
  app.useGlobalInterceptors(new ResponseTransformerInterceptor());

  await app.listen(3000);
}
bootstrap();
