import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 案例研究创建 DTO
 */
export class CreateBintelCaseStudyDTO {
  @Rule(RuleType.string().required())
  clientName: string;

  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  description: string;

  @Rule(RuleType.string().optional())
  logoUrl: string;

  @Rule(RuleType.string().optional())
  statText: string;

  @Rule(RuleType.number().optional())
  sortOrder: number;
}

/**
 * 案例研究更新 DTO
 */
export class UpdateBintelCaseStudyDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().optional())
  clientName: string;

  @Rule(RuleType.string().optional())
  title: string;

  @Rule(RuleType.string().optional())
  description: string;

  @Rule(RuleType.string().optional())
  logoUrl: string;

  @Rule(RuleType.string().optional())
  statText: string;

  @Rule(RuleType.number().optional())
  sortOrder: number;
}
