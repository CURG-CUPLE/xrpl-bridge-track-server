import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { BlockchainNetworkEntity } from './entity/blockchain.network.entity';
import { BlockchainBridgeTokenEntity } from './entity/blockchain.bridge.token.entity';
import { BlockchainBrideTransactionEntity } from './entity/blockchain.bride.transaction.entity';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cuple',
      entities: [
        BlockchainNetworkEntity,
        BlockchainBridgeTokenEntity,
        BlockchainBrideTransactionEntity,
      ],
      synchronize: true,
    };
  }
}
