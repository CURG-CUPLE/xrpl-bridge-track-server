import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'blockchain_bridge_token' })
export class BlockchainBridgeTokenEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: false,
  })
  id: bigint;

  @Column({
    name: 'symbol',
    type: 'varchar',
    length: 32,
    nullable: false,
    comment: '코인 심볼, ex.ETH',
  })
  txid: string;

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
