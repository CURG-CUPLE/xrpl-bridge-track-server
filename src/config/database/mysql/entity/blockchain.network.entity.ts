import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'blockchain_network' })
export class BlockchainNetworkEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    unsigned: false,
  })
  id: bigint;

  @Column({
    name: 'block_number',
    type: 'bigint',
    nullable: false,
    comment: '수집이 완료된 블록 번호',
  })
  blockNumber: bigint;

  @Column({
    name: 'network',
    type: 'varchar',
    length: 32,
    nullable: false,
    comment: '블록체인 네트워크 이름, ex.Ethereum',
  })
  network: string;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '변경일시',
  })
  updatedAt: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '생성일시',
  })
  createdAt: Date;
}
