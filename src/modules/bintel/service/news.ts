import { Provide } from '@midwayjs/core';

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { BintelNewsEntity } from '../entity/news';
import { v4 as uuidv4 } from 'uuid';

@Provide()
export class BintelNewsService {
  @InjectEntityModel(BintelNewsEntity)
  bintelNewsEntity: Repository<BintelNewsEntity>;

  async add(param) {
    param.newsId = uuidv4();
    return await this.bintelNewsEntity.save(param);
  }

  async update(param) {
    await this.bintelNewsEntity.update({ id: param.id }, param);
    return await this.info(param.id);
  }

  async delete(ids: number[] | string) {
    let idArray: number[] = [];
    if (Array.isArray(ids)) {
      idArray = ids as number[];
    } else {
      idArray = (ids as string).split(',').map(v => parseInt(v));
    }
    await this.bintelNewsEntity.delete({ id: In(idArray) });
    return true;
  }

  async info(id: number) {
    const info = await this.bintelNewsEntity.findOneBy({ id });
    if (info) {
      await this.bintelNewsEntity.increment({ id }, 'views', 1);
    }
    return info;
  }

  async page(query) {
    const qb = this.bintelNewsEntity.createQueryBuilder('a');
    if (query.keyWord) {
      qb.andWhere(
        '(a.title LIKE :kw OR a.summary LIKE :kw OR a.content LIKE :kw)',
        { kw: `%${query.keyWord}%` }
      );
    }
    if (query.category && query.category !== 'all') {
      qb.andWhere('a.category = :category', { category: query.category });
    }
    if (query.status && query.status !== 'all') {
      qb.andWhere('a.status = :status', { status: query.status });
    }
    qb.addOrderBy('a.publishedDate', 'DESC');
    const page = parseInt(query.page || 1);
    const size = parseInt(query.size || 15);
    qb.skip((page - 1) * size).take(size);
    const [list, total] = await qb.getManyAndCount();
    return { list, pagination: { page, size, total } };
  }

  async list(query) {
    const qb = this.bintelNewsEntity.createQueryBuilder('a');
    if (query.keyWord) {
      qb.andWhere(
        '(a.title LIKE :kw OR a.summary LIKE :kw OR a.content LIKE :kw)',
        { kw: `%${query.keyWord}%` }
      );
    }
    if (query.category && query.category !== 'all') {
      qb.andWhere('a.category = :category', { category: query.category });
    }
    if (query.status && query.status !== 'all') {
      qb.andWhere('a.status = :status', { status: query.status });
    }
    qb.addOrderBy('a.publishedDate', 'DESC');
    const list = await qb.getMany();
    return list;
  }
}
