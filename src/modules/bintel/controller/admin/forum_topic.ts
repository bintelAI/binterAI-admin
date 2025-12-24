import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { BintelForumService } from '../../service/forum';
import {
  CreateBintelForumTopicDTO,
  UpdateBintelForumTopicDTO,
} from '../../dto/forum_topic';

@CoolController({
  prefix: '/admin/bintel/forum_topic',
})
export class AdminBintelForumTopicController extends BaseController {
  @Inject()
  bintelForumService: BintelForumService;

  @Post('/add', { summary: '添加' })
  @Validate()
  async create(@Body() body: CreateBintelForumTopicDTO) {
    return this.ok(await this.bintelForumService.add(body));
  }

  @Post('/delete', { summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    return this.ok(await this.bintelForumService.delete(ids));
  }

  @Post('/update', { summary: '更新' })
  @Validate()
  async edit(@Body() body: UpdateBintelForumTopicDTO) {
    return this.ok(await this.bintelForumService.update(body));
  }

  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    return this.ok(await this.bintelForumService.info(id));
  }

  @Post('/list', { summary: '列表' })
  async getList(@Body() body) {
    return this.ok(await this.bintelForumService.list(body));
  }

  @Post('/page', { summary: '分页' })
  async getPage(@Body() body) {
    return this.ok(await this.bintelForumService.page(body));
  }
}
