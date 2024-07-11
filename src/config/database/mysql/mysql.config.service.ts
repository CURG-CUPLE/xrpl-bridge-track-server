import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { BlockchainNetworkEntity } from './entity/blockchain.network.entity';
import { BlockchainBridgeTokenEntity } from './entity/blockchain.bridge.token.entity';
import { BlockchainBridgeTransactionEntity } from './entity/blockchain.bridge.transaction.entity';

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
        BlockchainBridgeTransactionEntity,
      ],
      synchronize: true,
    };
  }
}
