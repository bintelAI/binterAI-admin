import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 产品创建 DTO
 */
export class CreateBintelProductDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required().default('subscription'))
  type: string;

  @Rule(RuleType.number().required())
  price: number;

  @Rule(RuleType.string().required().default('month'))
  cycle: string;

  @Rule(RuleType.number().default(0))
  sales: number;

  @Rule(RuleType.string().required())
  featuresStr: string;
  @Rule(RuleType.array().items(RuleType.string()).optional())
  features: string[];

  @Rule(RuleType.string().required().default('active'))
  status: string;
}

/**
 * 产品更新 DTO
 */
export class UpdateBintelProductDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().optional())
  name: string;

  @Rule(RuleType.string().optional())
  type: string;

  @Rule(RuleType.number().optional())
  price: number;

  @Rule(RuleType.string().optional())
  cycle: string;

  @Rule(RuleType.number().optional())
  sales: number;

  @Rule(RuleType.array().items(RuleType.string()).optional())
  features: string[];

  @Rule(RuleType.string().required())
  featuresStr: string;

  @Rule(RuleType.string().optional())
  status: string;
}
