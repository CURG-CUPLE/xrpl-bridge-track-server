import { Controller, Get } from '@nestjs/common';
import { BridgeService } from '../../service/bridge/bridge.service';

@Controller('bridges')
export class BridgeController {
  constructor(private readonly bridgeService: BridgeService) {}

  @Get('/api/v1/liquidity')
  async getLiquidity(): Promise<string> {
    return await this.bridgeService.getLiquidity();
  }
}
