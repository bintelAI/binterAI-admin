import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

@Entity('bintel_case_study')
export class BintelCaseStudyEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '案例ID', length: 50 })
  caseId: string;

  @Column({ comment: '客户名称', length: 100 })
  clientName: string;

  @Column({ comment: '标题', length: 200 })
  title: string;

  @Column({ comment: '描述', length: 500 })
  description: string;

  @Column({ comment: 'Logo URL', nullable: true })
  logoUrl: string;

  @Column({ comment: '关键指标文案', length: 50, nullable: true })
  statText: string;

  @Column({ comment: '排序权重', default: 0 })
  sortOrder: number;
}
