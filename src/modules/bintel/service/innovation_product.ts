import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { BintelInnovationProductEntity } from '../entity/innovation_product';

@Provide()
export class BintelInnovationProductService {
  @InjectEntityModel(BintelInnovationProductEntity)
  bintelInnovationProductEntity: Repository<BintelInnovationProductEntity>;

  /**
   * 添加创新产品
   */
  async add(param) {
    return await this.bintelInnovationProductEntity.save(param);
  }

  /**
   * 更新创新产品
   */
  async update(param) {
    await this.bintelInnovationProductEntity.update({ id: param.id }, param);
    return await this.info(param.id);
  }

  /**
   * 删除创新产品
   */
  async delete(ids: number[] | string) {
    let idArray: number[] = [];
    if (Array.isArray(ids)) {
      idArray = ids as number[];
    } else {
      idArray = (ids as string).split(',').map(v => parseInt(v));
    }
    await this.bintelInnovationProductEntity.delete({ id: In(idArray) });
    return true;
  }

  /**
   * 获取创新产品详情
   */
  async info(id: number) {
    const info = await this.bintelInnovationProductEntity.findOneBy({ id });
    return info;
  }

  /**
   * 创新产品分页查询
   */
  async page(query) {
    const qb = this.bintelInnovationProductEntity.createQueryBuilder('a');
    if (query.keyWord) {
      qb.andWhere('(a.name LIKE :keyWord)', { keyWord: `%${query.keyWord}%` });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const page = parseInt(query.page || 1);
    const size = parseInt(query.size || 15);
    qb.skip((page - 1) * size).take(size);
    const [list, total] = await qb.getManyAndCount();
    return { list, pagination: { page, size, total } };
  }

  /**
   * 获取创新产品列表
   */
  async list(query) {
    const qb = this.bintelInnovationProductEntity.createQueryBuilder('a');
    if (query.keyWord) {
      qb.andWhere('(a.name LIKE :keyWord)', { keyWord: `%${query.keyWord}%` });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const list = await qb.getMany();
    return list;
  }
}