import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

@Entity('bintel_product_plan')
export class BintelProductPlanEntity extends BaseEntity {
  @Index()
  @Column({ comment: '关联产品ID (字符串)', length: 50 })
  productId: string;

  @Column({ comment: '方案名称', length: 100 })
  name: string;

  @Column({ comment: '计费周期', default: 'monthly' })
  billingCycle: string;

  @Column({ comment: '价格', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ comment: '货币', length: 3, default: 'CNY' })
  currency: string;

  @Column({ comment: '特有功能', type: 'json', nullable: true })
  featuresSnapshot: string[];
}
