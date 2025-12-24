import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 系统设置创建 DTO
 */
export class CreateBintelSystemSettingDTO {
  @Rule(RuleType.string().required())
  keyName: string;

  @Rule(RuleType.string().optional())
  value: string;

  @Rule(RuleType.string().optional())
  description: string;

  @Rule(RuleType.string().required())
  group: string;

  @Rule(RuleType.boolean().optional())
  isEncrypted: boolean;
}

/**
 * 系统设置更新 DTO
 */
export class UpdateBintelSystemSettingDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().optional())
  keyName: string;

  @Rule(RuleType.string().optional())
  value: string;

  @Rule(RuleType.string().optional())
  description: string;

  @Rule(RuleType.string().optional())
  group: string;

  @Rule(RuleType.boolean().optional())
  isEncrypted: boolean;
}
