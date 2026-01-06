import { Provide } from '@midwayjs/core';

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { BintelSystemSettingEntity } from '../entity/system_setting';

@Provide()
export class BintelSystemSettingService {
  @InjectEntityModel(BintelSystemSettingEntity)
  bintelSystemSettingEntity: Repository<BintelSystemSettingEntity>;

  async add(param) {
    return await this.bintelSystemSettingEntity.save(param);
  }

  async update(param) {
    await this.bintelSystemSettingEntity.update({ id: param.id }, param);
    return await this.info(param.id);
  }

  async delete(ids: number[] | string) {
    let idArray: number[] = [];
    if (Array.isArray(ids)) {
      idArray = ids as number[];
    } else {
      idArray = (ids as string).split(',').map(v => parseInt(v));
    }
    await this.bintelSystemSettingEntity.delete({ id: In(idArray) });
    return true;
  }

  async info(id: number) {
    const info = await this.bintelSystemSettingEntity.findOneBy({ id });
    return info;
  }

  async page(query) {
    const qb = this.bintelSystemSettingEntity.createQueryBuilder('a');
    if (query.group) {
      qb.andWhere('a.group = :group', { group: query.group });
    }
    if (query.keyWord) {
      qb.andWhere('(a.keyName LIKE :kw OR a.description LIKE :kw)', {
        kw: `%${query.keyWord}%`,
      });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const page = parseInt(query.page || 1);
    const size = parseInt(query.size || 15);
    qb.skip((page - 1) * size).take(size);
    const [list, total] = await qb.getManyAndCount();
    return { list, pagination: { page, size, total } };
  }

  async list(query) {
    const qb = this.bintelSystemSettingEntity.createQueryBuilder('a');
    if (query.group) {
      qb.andWhere('a.group = :group', { group: query.group });
    }
    if (query.keyWord) {
      qb.andWhere('(a.keyName LIKE :kw OR a.description LIKE :kw)', {
        kw: `%${query.keyWord}%`,
      });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const list = await qb.getMany();
    return list;
  }

  async getByKey(keyName: string) {
    return await this.bintelSystemSettingEntity.findOneBy({ keyName });
  }

  async saveByKey(
    keyName: string,
    value: string,
    group = 'default',
    description = ''
  ) {
    let setting = await this.bintelSystemSettingEntity.findOneBy({ keyName });
    if (setting) {
      setting.value = value;
      if (description) {
        setting.description = description;
      }
      await setting.save();
    } else {
      await this.bintelSystemSettingEntity.save({
        keyName,
        value,
        group,
        description,
        isEncrypted: false,
      });
    }
    return true;
  }

  /**
   * 初始化前端模块显示配置
   */
  async initFrontendConfig() {
    const configs = [
      { keyName: 'forum_enabled', value: 'false', group: 'frontend', description: '是否显示开发者社区模块' },
      { keyName: 'news_enabled', value: 'false', group: 'frontend', description: '是否显示新闻动态模块' },
    ];
    
    for (const config of configs) {
      await this.saveByKey(config.keyName, config.value, config.group, config.description);
    }
  }
}
