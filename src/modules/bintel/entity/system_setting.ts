import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

@Entity('bintel_system_setting')
export class BintelSystemSettingEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '配置键', length: 100 })
  keyName: string;

  @Column({ comment: '配置值', type: 'text', nullable: true })
  value: string;

  @Column({ comment: '说明', length: 255, nullable: true })
  description: string;

  @Index()
  @Column({ comment: '分组', length: 50 })
  group: string;

  @Column({ comment: '是否加密', default: false })
  isEncrypted: boolean;
}
