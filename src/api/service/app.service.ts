import { Injectable } from '@nestjs/common';
import { Web3 } from 'web3';

@Injectable()
export class AppService {
  private web3;
  constructor() {
    this.web3 = new Web3('https://rpc-evm-sidechain.xrpl.org');
  }
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
