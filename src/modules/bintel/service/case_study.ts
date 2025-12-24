import { Provide } from '@midwayjs/core';

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { BintelCaseStudyEntity } from '../entity/case_study';
import { v4 as uuidv4 } from 'uuid';

@Provide()
export class BintelCaseStudyService {
  @InjectEntityModel(BintelCaseStudyEntity)
  bintelCaseStudyEntity: Repository<BintelCaseStudyEntity>;

  async add(param) {
    param.caseId = uuidv4();
    return await this.bintelCaseStudyEntity.save(param);
  }

  async update(param) {
    await this.bintelCaseStudyEntity.update({ id: param.id }, param);
    return await this.info(param.id);
  }

  async delete(ids: number[] | string) {
    let idArray: number[] = [];
    if (Array.isArray(ids)) {
      idArray = ids as number[];
    } else {
      idArray = (ids as string).split(',').map(v => parseInt(v));
    }
    await this.bintelCaseStudyEntity.delete({ id: In(idArray) });
    return true;
  }

  async info(id: number) {
    const info = await this.bintelCaseStudyEntity.findOneBy({ id });
    return info;
  }

  async page(query) {
    const qb = this.bintelCaseStudyEntity.createQueryBuilder('a');
    if (query.keyWord) {
      qb.andWhere(
        '(a.title LIKE :kw OR a.description LIKE :kw OR a.clientName LIKE :kw)',
        { kw: `%${query.keyWord}%` }
      );
    }
    qb.addOrderBy('a.sortOrder', 'DESC');
    qb.addOrderBy('a.createTime', 'DESC');
    const page = parseInt(query.page || 1);
    const size = parseInt(query.size || 15);
    qb.skip((page - 1) * size).take(size);
    const [list, total] = await qb.getManyAndCount();
    return { list, pagination: { page, size, total } };
  }

  async list(query) {
    const qb = this.bintelCaseStudyEntity.createQueryBuilder('a');
    if (query.keyWord) {
      qb.andWhere(
        '(a.title LIKE :kw OR a.description LIKE :kw OR a.clientName LIKE :kw)',
        { kw: `%${query.keyWord}%` }
      );
    }
    qb.addOrderBy('a.sortOrder', 'DESC');
    qb.addOrderBy('a.createTime', 'DESC');
    const list = await qb.getMany();
    return list;
  }
}
