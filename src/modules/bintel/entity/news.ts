import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index } from 'typeorm';

@Entity('bintel_news')
export class BintelNewsEntity extends BaseEntity {
  @Index({ unique: true })
  @Column({ comment: '新闻ID (字符串)', length: 50 })
  newsId: string;

  @Column({ comment: '标题', length: 200 })
  title: string;

  @Column({ comment: '摘要', length: 500 })
  summary: string;

  @Column({ comment: '内容', type: 'longtext' })
  content: string;

  @Index()
  @Column({ comment: '分类', length: 50 })
  category: string;

  @Column({ comment: '作者', length: 50 })
  author: string;

  @Column({ comment: '封面图', nullable: true })
  coverImage: string;

  @Column({ comment: '标签', type: 'json', nullable: true })
  tags: string[];

  @Index()
  @Column({ comment: '发布日期' })
  publishedDate: Date;

  @Column({ comment: '浏览量', default: 0 })
  views: number;

  @Column({ comment: '状态: draft, published, archived', default: 'draft' })
  status: string;
}
