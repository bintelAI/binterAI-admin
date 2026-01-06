import { BaseEntity } from '@cool-midway/core';
import { Column, Entity } from 'typeorm';

@Entity('bintel_innovation_product')
export class BintelInnovationProductEntity extends BaseEntity {
  @Column({ comment: '产品名称', length: 100 })
  name: string;

  @Column({ comment: '产品描述', type: 'text' })
  desc: string;

  @Column({ comment: '产品图标', length: 100 })
  icon: string;

  @Column({ comment: '产品链接', length: 255 })
  url: string;
}