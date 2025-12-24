import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 订单创建 DTO
 */
export class CreateBintelOrderDTO {
  @Rule(RuleType.number().optional())
  userId: number;

  @Rule(RuleType.string().optional())
  customerName: string;

  @Rule(RuleType.number().required())
  productPlanId: number;

  @Rule(RuleType.string().optional())
  productNameSnapshot: string;

  @Rule(RuleType.number().optional())
  amount: number;

  @Rule(RuleType.string().optional())
  paymentMethod: string;

  @Rule(RuleType.string().optional())
  status: string;

  @Rule(RuleType.date().optional())
  paidAt: Date;
}

/**
 * 订单更新 DTO
 */
export class UpdateBintelOrderDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().optional())
  userId: number;

  @Rule(RuleType.string().optional())
  customerName: string;

  @Rule(RuleType.number().optional())
  productPlanId: number;

  @Rule(RuleType.string().optional())
  productNameSnapshot: string;

  @Rule(RuleType.number().optional())
  amount: number;

  @Rule(RuleType.string().optional())
  paymentMethod: string;

  @Rule(RuleType.string().optional())
  status: string;

  @Rule(RuleType.date().optional())
  paidAt: Date;
}
