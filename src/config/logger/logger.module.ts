import { Module } from '@nestjs/common';
import { WinstonLoggerConfigService } from './winston.logger.config.service';

@Module({
  providers: [WinstonLoggerConfigService],
  exports: [WinstonLoggerConfigService],
})
export class LoggerModule {}
