import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 产品方案创建 DTO
 */
export class CreateBintelProductPlanDTO {
  @Rule(RuleType.string().required())
  productId: string;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().optional())
  billingCycle: string;

  @Rule(RuleType.number().required())
  price: number;

  @Rule(RuleType.string().optional())
  currency: string;

  @Rule(RuleType.array().items(RuleType.string()).optional())
  featuresSnapshot: string[];
}

/**
 * 产品方案更新 DTO
 */
export class UpdateBintelProductPlanDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().optional())
  productId: string;

  @Rule(RuleType.string().optional())
  name: string;

  @Rule(RuleType.string().optional())
  billingCycle: string;

  @Rule(RuleType.number().optional())
  price: number;

  @Rule(RuleType.string().optional())
  currency: string;

  @Rule(RuleType.array().items(RuleType.string()).optional())
  featuresSnapshot: string[];
}
