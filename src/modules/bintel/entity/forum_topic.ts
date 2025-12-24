import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserInfoEntity } from '../../user/entity/info';

@Entity('bintel_forum_topic')
export class BintelForumTopicEntity extends BaseEntity {
  @Column({ comment: '标题', length: 200 })
  title: string;

  @Column({ comment: '内容', type: 'longtext' })
  content: string;

  @Column({ comment: '板块分类', length: 50 })
  category: string;

  @Index()
  @Column({ comment: '作者ID' })
  authorId: number;

  @ManyToOne(() => UserInfoEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'authorId' })
  authorInfo: UserInfoEntity;

  @Column({ comment: '浏览数', default: 0 })
  views: number;

  @Column({ comment: '点赞数', default: 0 })
  likes: number;

  @Column({ comment: '回复数', default: 0 })
  repliesCount: number;

  @Index()
  @Column({ comment: '是否热门', default: false })
  isHot: boolean;

  @Column({ comment: '是否置顶', default: false })
  isPinned: boolean;

  @Column({ comment: '标签', type: 'json', nullable: true })
  tags: string[];
}
