import { Provide } from '@midwayjs/core';

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { BintelProductPlanEntity } from '../entity/product_plan';

@Provide()
export class BintelProductPlanService {
  @InjectEntityModel(BintelProductPlanEntity)
  bintelProductPlanEntity: Repository<BintelProductPlanEntity>;

  async add(param) {
    return await this.bintelProductPlanEntity.save(param);
  }

  async update(param) {
    await this.bintelProductPlanEntity.update({ id: param.id }, param);
    return await this.info(param.id);
  }

  async delete(ids: number[] | string) {
    let idArray: number[] = [];
    if (Array.isArray(ids)) {
      idArray = ids as number[];
    } else {
      idArray = (ids as string).split(',').map(v => parseInt(v));
    }
    await this.bintelProductPlanEntity.delete({ id: In(idArray) });
    return true;
  }

  async info(id: number) {
    const info = await this.bintelProductPlanEntity.findOneBy({ id });
    return info;
  }

  async page(query) {
    const qb = this.bintelProductPlanEntity.createQueryBuilder('a');
    if (query.productId) {
      qb.andWhere('a.productId = :productId', { productId: query.productId });
    }
    if (query.keyWord) {
      qb.andWhere('(a.name LIKE :kw)', { kw: `%${query.keyWord}%` });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const page = parseInt(query.page || 1);
    const size = parseInt(query.size || 15);
    qb.skip((page - 1) * size).take(size);
    const [list, total] = await qb.getManyAndCount();
    return { list, pagination: { page, size, total } };
  }

  async list(query) {
    const qb = this.bintelProductPlanEntity.createQueryBuilder('a');
    if (query.productId) {
      qb.andWhere('a.productId = :productId', { productId: query.productId });
    }
    if (query.keyWord) {
      qb.andWhere('(a.name LIKE :kw)', { kw: `%${query.keyWord}%` });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const list = await qb.getMany();
    return list;
  }
}
