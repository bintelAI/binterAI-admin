import { Rule, RuleType } from '@midwayjs/validate';

/**
 * 新闻创建 DTO
 */
export class CreateBintelNewsDTO {
  @Rule(RuleType.string().required())
  title: string;

  @Rule(RuleType.string().required())
  summary: string;

  @Rule(RuleType.string().required())
  content: string;

  @Rule(RuleType.string().required())
  category: string;

  @Rule(RuleType.string().optional())
  author: string;

  @Rule(RuleType.string().optional())
  coverImage: string;

  @Rule(RuleType.array().items(RuleType.string()).optional())
  tags: string[];

  @Rule(RuleType.date().optional())
  publishedDate: Date;

  @Rule(RuleType.string().optional())
  status: string;
}

/**
 * 新闻更新 DTO
 */
export class UpdateBintelNewsDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().optional())
  title: string;

  @Rule(RuleType.string().optional())
  summary: string;

  @Rule(RuleType.string().optional())
  content: string;

  @Rule(RuleType.string().optional())
  category: string;

  @Rule(RuleType.string().optional())
  author: string;

  @Rule(RuleType.string().optional())
  coverImage: string;

  @Rule(RuleType.array().items(RuleType.string()).optional())
  tags: string[];

  @Rule(RuleType.date().optional())
  publishedDate: Date;

  @Rule(RuleType.string().optional())
  status: string;
}
