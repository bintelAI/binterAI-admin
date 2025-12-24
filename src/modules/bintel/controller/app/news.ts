import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { BintelNewsService } from '../../service/news';
import { Inject, Get, Post, Body, Query, Provide } from '@midwayjs/core';

@Provide()
@CoolController({
  prefix: '/app/bintel/news',
})
export class AppBintelNewsController extends BaseController {
  @Inject()
  bintelNewsService: BintelNewsService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/page', { summary: '分页查询' })
  async getPage(@Body() body) {
    const data = await this.bintelNewsService.page(body || {});
    return this.ok(data);
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/list', { summary: '列表查询' })
  async getList(@Body() body) {
    const data = await this.bintelNewsService.list(body || {});
    return this.ok(data);
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    const data = await this.bintelNewsService.info(id);
    return this.ok(data);
  }
}
