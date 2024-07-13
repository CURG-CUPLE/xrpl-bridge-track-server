import { Injectable } from '@nestjs/common';

@Injectable()
export class BridgeService {
  constructor() {}

  async getliquidity(): Promise<string> {
    return '0.0';
  }

}