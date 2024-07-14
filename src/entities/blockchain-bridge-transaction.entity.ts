import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('blockchain_bridge_transaction')
export class BlockchainBridgeTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true })
  network_id: number;

  @Column({ length: 128 })
  txid: string;

  @Column({ type: 'decimal', unsigned: true })
  amount: string;

  @Column({ type: 'decimal', unsigned: true })
  fee: number;

  @Column({ type: 'bigint', unsigned: true })
  block_number: number;

  @Column({ length: 128 })
  to: string;

  @Column({ type: 'bigint', unsigned: true })
  block_time: number;

  @Column({ length: 32 })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
