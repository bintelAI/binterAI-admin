import { Provide, Inject } from '@midwayjs/core';

import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { BintelOrderEntity } from '../entity/order';
import { BintelProductPlanEntity } from '../entity/product_plan';
import { CoolCommException } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';

@Provide()
export class BintelOrderService {
  @InjectEntityModel(BintelOrderEntity)
  bintelOrderEntity: Repository<BintelOrderEntity>;

  @InjectEntityModel(BintelProductPlanEntity)
  bintelProductPlanEntity: Repository<BintelProductPlanEntity>;

  @Inject()
  ctx: Context;

  /**
   * 分页查询
   * @param query
   */
  async page(query) {
    const qb = this.bintelOrderEntity.createQueryBuilder('a');
    const { userId } = this.ctx.admin || {};
    if (this.ctx.admin && userId) {
      qb.andWhere('a.userId = :userId', { userId });
    }
    if (query.status && query.status !== 'all') {
      qb.andWhere('a.status = :status', { status: query.status });
    }
    if (query.keyWord) {
      qb.andWhere('(a.orderNum LIKE :kw OR a.productNameSnapshot LIKE :kw)', {
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

  async stats() {
    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0,
      0,
      0
    );
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const qb = this.bintelOrderEntity.createQueryBuilder('a');
    const { userId } = this.ctx.admin || {};
    if (this.ctx.admin && userId) {
      qb.andWhere('a.userId = :userId', { userId });
    }

    qb.leftJoin(BintelProductPlanEntity, 'plan', 'plan.id = a.productPlanId');
    qb.where('a.createTime >= :startOfMonth AND a.createTime <= :endOfMonth', {
      startOfMonth,
      endOfMonth,
    });

    const raw = await qb
      .select(
        'COALESCE(SUM(CASE WHEN a.status = :paid THEN a.amount ELSE 0 END), 0)',
        'monthRevenue'
      )
      .addSelect(
        'COALESCE(SUM(CASE WHEN a.status = :paid AND plan.billingCycle = :monthly THEN a.amount ELSE 0 END), 0)',
        'mrr'
      )
      .addSelect(
        'COUNT(CASE WHEN a.status = :paid THEN 1 END)',
        'paidOrderCount'
      )
      .addSelect(
        'COUNT(CASE WHEN a.status = :pending THEN 1 END)',
        'pendingCount'
      )
      .setParameters({
        paid: 'paid',
        pending: 'pending',
        monthly: 'monthly',
      })
      .getRawOne();

    return {
      monthRevenue: Number(raw?.monthRevenue || 0),
      mrr: Number(raw?.mrr || 0),
      paidOrderCount: Number(raw?.paidOrderCount || 0),
      pendingCount: Number(raw?.pendingCount || 0),
    };
  }

  /**
   * 创建订单
   * @param param
   */
  async add(param) {
    const { userId } = this.ctx.admin || {};
    if (!userId) {
      throw new CoolCommException('请先登录');
    }

    const { productPlanId } = param;
    if (!productPlanId) {
      throw new CoolCommException('请选择产品方案');
    }

    const plan = await this.bintelProductPlanEntity.findOneBy({
      id: productPlanId,
    });
    if (!plan) {
      throw new CoolCommException('产品方案不存在');
    }

    param.userId = userId;
    param.productPlanId = productPlanId;
    param.amount = plan.price;
    param.productNameSnapshot = plan.name;
    param.status = 'pending';
    param.orderNum = 'ORD-' + Date.now() + Math.floor(Math.random() * 1000);
    const saved = await this.bintelOrderEntity.save(param);
    return saved;
  }

  async list(query) {
    const qb = this.bintelOrderEntity.createQueryBuilder('a');
    const { userId } = this.ctx.admin || {};
    if (this.ctx.admin && userId) {
      qb.andWhere('a.userId = :userId', { userId });
    }
    if (query.status && query.status !== 'all') {
      qb.andWhere('a.status = :status', { status: query.status });
    }
    qb.addOrderBy('a.createTime', 'DESC');
    const list = await qb.getMany();
    return list;
  }

  async info(id: number) {
    const info = await this.bintelOrderEntity.findOneBy({ id });
    return info;
  }

  async update(param) {
    await this.bintelOrderEntity.update({ id: param.id }, param);
    return await this.info(param.id);
  }

  async delete(ids: number[] | string) {
    let idArray: number[] = [];
    if (Array.isArray(ids)) {
      idArray = ids as number[];
    } else {
      idArray = (ids as string).split(',').map(v => parseInt(v));
    }
    await this.bintelOrderEntity.delete({ id: In(idArray) });
    return true;
  }
}
