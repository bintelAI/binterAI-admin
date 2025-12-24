import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { BintelForumService } from '../../service/forum';
import { Inject, Get, Post, Body, Query, Provide } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import {
  CreateBintelForumTopicDTO,
  UpdateBintelForumTopicDTO,
} from '../../dto/forum_topic';

@Provide()
@CoolController({
  prefix: '/app/bintel/forum',
})
export class AppBintelForumController extends BaseController {
  @Inject()
  bintelForumService: BintelForumService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/page', { summary: '分页查询' })
  async getPage(@Body() body) {
    const data = await this.bintelForumService.page(body || {});
    return this.ok(data);
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/list', { summary: '列表查询' })
  async getList(@Body() body) {
    const data = await this.bintelForumService.list(body || {});
    return this.ok(data);
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    const data = await this.bintelForumService.info(id);
    return this.ok(data);
  }

  @Post('/add', { summary: '发布帖子' })
  @Validate()
  async create(@Body() body: CreateBintelForumTopicDTO) {
    const data = await this.bintelForumService.add(body);
    return this.ok(data);
  }

  @Post('/update', { summary: '修改帖子' })
  @Validate()
  async updateTopic(@Body() body: UpdateBintelForumTopicDTO) {
    const data = await this.bintelForumService.update(body);
    return this.ok(data);
  }

  @Post('/delete', { summary: '删除帖子' })
  async deleteTopics(@Body('ids') ids: string | number[] | string[]) {
    await this.bintelForumService.delete(ids);
    return this.ok();
  }
}
