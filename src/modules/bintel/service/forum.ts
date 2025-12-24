import { Provide, Inject } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { BintelForumTopicEntity } from '../entity/forum_topic';
import { UserInfoEntity } from '../../user/entity/info';
import { CoolCommException } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';

@Provide()
export class BintelForumService {
  @InjectEntityModel(BintelForumTopicEntity)
  bintelForumTopicEntity: Repository<BintelForumTopicEntity>;

  @InjectEntityModel(UserInfoEntity)
  userInfoEntity: Repository<UserInfoEntity>;

  @Inject()
  ctx: Context;

  /**
   * 发布帖子
   * @param param
   */
  async add(param) {
    const { userId } = this.ctx.admin || {};
    if (!userId) {
      throw new CoolCommException('请先登录');
    }
    param.authorId = userId;
    const saved = await this.bintelForumTopicEntity.save(param);
    return saved;
  }

  /**
   * 修改
   * @param param
   */
  async update(param) {
    const { userId } = this.ctx.admin || {};
    const isAdmin = !!this.ctx.admin;
    if (!userId) {
      throw new CoolCommException('请先登录');
    }
    const info = await this.bintelForumTopicEntity.findOneBy({ id: param.id });
    if (!info) {
      throw new CoolCommException('帖子不存在');
    }
    // Admin can edit anyone's post, User can only edit their own
    if (!isAdmin && info.authorId !== userId) {
      throw new CoolCommException('无权修改他人的帖子');
    }
    await this.bintelForumTopicEntity.update({ id: param.id }, param);
    return await this.info(param.id);
  }

  /**
   * 删除
   * @param ids
   */
  async delete(ids) {
    const { userId } = this.ctx.admin || {};
    const isAdmin = !!this.ctx.admin;
    if (!userId) {
      throw new CoolCommException('请先登录');
    }

    let idArray = [];
    if (ids instanceof Array) {
      idArray = ids;
    } else {
      idArray = ids.split(',');
    }

    const topics = await this.bintelForumTopicEntity.findBy({
      id: In(idArray),
    });
    for (const topic of topics) {
      // Admin can delete anyone's post, User can only delete their own
      if (!isAdmin && topic.authorId !== userId) {
        throw new CoolCommException(`无权删除帖子: ${topic.title}`);
      }
    }

    await this.bintelForumTopicEntity.delete({
      id: In(idArray),
    });
    return true;
  }

  /**
   * 详情
   * @param id
   */
  async info(id) {
    const info = await this.bintelForumTopicEntity
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.authorInfo', 'author')
      .where('topic.id = :id', { id })
      .getOne();

    if (info) {
      // Increase views
      await this.bintelForumTopicEntity.increment({ id }, 'views', 1);
    }
    return info;
  }

  async page(query) {
    const { keyWord, category } = query;
    const qb = this.bintelForumTopicEntity
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.authorInfo', 'author');

    if (keyWord) {
      qb.andWhere(
        '(topic.title LIKE :keyWord OR topic.content LIKE :keyWord)',
        { keyWord: `%${keyWord}%` }
      );
    }
    if (category) {
      qb.andWhere('topic.category = :category', { category });
    }

    qb.orderBy('topic.createTime', 'DESC');

    const page = parseInt(query.page || 1);
    const size = parseInt(query.size || 15);
    qb.skip((page - 1) * size).take(size);
    const [list, total] = await qb.getManyAndCount();
    return { list, pagination: { page, size, total } };
  }

  async list(query) {
    const { keyWord, category } = query;
    const qb = this.bintelForumTopicEntity
      .createQueryBuilder('topic')
      .leftJoinAndSelect('topic.authorInfo', 'author');

    if (keyWord) {
      qb.andWhere(
        '(topic.title LIKE :keyWord OR topic.content LIKE :keyWord)',
        { keyWord: `%${keyWord}%` }
      );
    }
    if (category) {
      qb.andWhere('topic.category = :category', { category });
    }

    qb.orderBy('topic.createTime', 'DESC');

    const list = await qb.getMany();
    return list;
  }
}
