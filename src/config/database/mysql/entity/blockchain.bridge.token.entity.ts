import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'blockchain_bridge_token' })
export class BlockchainBridgeTokenEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'network_id',
    type: 'int',
    unsigned: true,
    nullable: false,
    comment: '코인 심볼, ex.ETH',
  })
  netowrkId: number;

  @Column({
    name: 'symbol',
    type: 'varchar',
    length: 32,
    nullable: false,
    comment: '코인 심볼, ex.ETH',
  })
  symbol: string;

  @Column({
    name: 'contract_address',
    type: 'varchar',
    length: 128,
    nullable: false,
    comment: 'Bridge Contract Address',
  })
  contract_address: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '생성일시',
  })
  createdAt: Date;
}
