import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'blockchain_bridge_transaction' })
export class BlockchainBridgeTransactionEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: false,
  })
  id: bigint;

  @Column({
    name: 'token_id',
    type: 'int',
    unsigned: true,
    nullable: false,
    comment: 'blockchain_network.id',
  })
  tokenId: number;

  @Column({
    name: 'block_number',
    type: 'bigint',
    unsigned: true,
    nullable: false,
    comment: 'block number',
  })
  blockNumber: bigint;

  @Column({
    name: 'txid',
    type: 'varchar',
    length: 128,
    nullable: false,
    comment: 'transaction hash',
  })
  txid: string;

  @Column({
    name: 'to',
    type: 'varchar',
    length: 128,
    nullable: false,
    comment: 'bridge to address',
  })
  to: string;

  @Column({
    name: 'amount',
    type: 'bigint',
    nullable: false,
    comment: 'bridge amount',
  })
  amount: bigint;

  @Column({
    name: 'fee',
    type: 'bigint',
    nullable: false,
    comment: 'bridge transaction network fee',
  })
  fee: bigint;

  @Column({
    name: 'block_time',
    type: 'bigint',
    unsigned: true,
    nullable: false,
    comment: 'block time',
  })
  blockTime: bigint;

  @Column({
    name: 'status',
    type: 'varchar',
    nullable: false,
    comment: '트랜잭션 상태',
  })
  status: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '생성일시',
  })
  createdAt: Date;
}
