import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 创建创新产品
 */
export class BintelInnovationProductAddDTO {
  @Rule(RuleType.string().required().max(100))
  name: string;

  @Rule(RuleType.string().required())
  desc: string;

  @Rule(RuleType.string().required().max(100))
  icon: string;

  @Rule(RuleType.string().required().max(255))
  url: string;
}

/**
 * 更新创新产品
 */
export class BintelInnovationProductUpdateDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required().max(100))
  name: string;

  @Rule(RuleType.string().required())
  desc: string;

  @Rule(RuleType.string().required().max(100))
  icon: string;

  @Rule(RuleType.string().required().max(255))
  url: string;
}

/**
 * 创新产品查询
 */
export class BintelInnovationProductQueryDTO {
  @Rule(RuleType.string().optional().allow('').max(100))
  keyWord?: string;

  @Rule(RuleType.number().optional().min(1))
  page?: number;

  @Rule(RuleType.number().optional().min(1).max(100))
  size?: number;
}

