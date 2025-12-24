import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 论坛话题创建 DTO
 */
export class CreateBintelForumTopicDTO {
  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string().required())
  category: string;

  @Rule(RuleType.array().items(RuleType.string()).optional())
  tags: string[];

  @Rule(RuleType.boolean().optional())
  isHot: boolean;

  @Rule(RuleType.boolean().optional())
  isPinned: boolean;
}

/**
 * 论坛话题更新 DTO
 */
export class UpdateBintelForumTopicDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().optional())
  title: string;

  @Rule(RuleType.string().optional())
  content: string;

  @Rule(RuleType.string().optional())
  category: string;

  @Rule(RuleType.array().items(RuleType.string()).optional())
  tags: string[];

  @Rule(RuleType.boolean().optional())
  isHot: boolean;

  @Rule(RuleType.boolean().optional())
  isPinned: boolean;
}
