import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

@Entity('bintel_order')
export class BintelOrderEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '订单号', length: 32 })
  orderNum: string;

  @Index()
  @Column({ comment: '用户ID', nullable: true })
  userId: number;

  @Column({ comment: '客户名称快照', length: 100, nullable: true })
  customerName: string;

  @Column({ name: 'productId', comment: '关联定价方案ID', nullable: true })
  productPlanId: number;

  @Column({ comment: '产品名称快照', length: 200 })
  productNameSnapshot: string;

  @Column({ comment: '订单金额', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ comment: '支付方式', length: 20, nullable: true })
  paymentMethod: string;

  @Column({
    comment: '订单状态: pending, paid, refunded, cancelled',
    default: 'pending',
  })
  status: string;

  @Column({ comment: '支付时间', nullable: true })
  paidAt: Date;
}
