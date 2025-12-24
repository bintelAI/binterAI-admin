import { Provide } from '@midwayjs/core';

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { BintelProductEntity } from '../entity/product';
import { v4 as uuidv4 } from 'uuid';

@Provide()
export class BintelProductService {
  @InjectEntityModel(BintelProductEntity)
  bintelProductEntity: Repository<BintelProductEntity>;

  async add(param) {
    param.productId = uuidv4();
    if (!param.pageId) {
      param.pageId = uuidv4();
    }
    return await this.bintelProductEntity.save(param);
  }

  async update(param) {
    await this.bintelProductEntity.update({ id: param.id }, param);
    return await this.info(param.id);
  }

  async delete(ids: number[] | string) {
    let idArray: number[] = [];
    if (Array.isArray(ids)) {
      idArray = ids as number[];
    } else {
      idArray = (ids as string).split(',').map(v => parseInt(v));
    }
    await this.bintelProductEntity.delete({ id: In(idArray) });
    return true;
  }

  async info(id: number) {
    const info = await this.bintelProductEntity.findOneBy({ id });
    return info;
  }

  async page(query) {
    const qb = this.bintelProductEntity.createQueryBuilder('a');
    if (query.keyWord) {
      qb.andWhere('(a.name LIKE :kw)', { kw: `%${query.keyWord}%` });
    }
    // category removed
    if (query.status !== undefined) {
      qb.andWhere('a.status = :status', { status: query.status });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const page = parseInt(query.page || 1);
    const size = parseInt(query.size || 15);
    qb.skip((page - 1) * size).take(size);
    const [list, total] = await qb.getManyAndCount();
    return { list, pagination: { page, size, total } };
  }

  async list(query) {
    const qb = this.bintelProductEntity.createQueryBuilder('a');
    if (query.keyWord) {
      qb.andWhere('(a.name LIKE :kw)', { kw: `%${query.keyWord}%` });
    }
    // category removed
    if (query.status !== undefined) {
      qb.andWhere('a.status = :status', { status: query.status });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const list = await qb.getMany();
    return list;
  }
}
