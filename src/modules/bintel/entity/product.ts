import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

@Entity('bintel_product')
export class BintelProductEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '产品ID (字符串主键)', length: 50 })
  productId: string;

  @Column({ comment: '页面路由ID', length: 50 })
  pageId: string;

  @Column({ comment: '产品名称', length: 100 })
  name: string;

  @Column({
    comment: '售卖类型: subscription, license',
    length: 50,
    default: 'subscription',
  })
  type: string;

  @Column({
    comment: '价格',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({
    comment: '计费周期: month, year, one-time',
    length: 50,
    default: 'month',
  })
  cycle: string;

  @Column({ comment: '销量', type: 'int', default: 0 })
  sales: number;

  @Column({ comment: '特性列表', type: 'json', nullable: true })
  features: string[];

  @Column({ comment: '特性列表str: json', length: 50 })
  featuresStr: string;

  @Column({ comment: '状态: active, draft', length: 20, default: 'active' })
  status: string;
}
