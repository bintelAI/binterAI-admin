import {
  CoolController,
  BaseController,
  CoolTag,
  TagTypes,
} from '@cool-midway/core';
import { BintelProductService } from '../../service/product';
import { Inject, Get, Post, Body, Query, Provide } from '@midwayjs/core';

@Provide()
@CoolController({
  prefix: '/app/bintel/product',
})
export class AppBintelProductController extends BaseController {
  @Inject()
  bintelProductService: BintelProductService;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/page', { summary: '分页查询' })
  async getPage(@Body() body) {
    const data = await this.bintelProductService.page(body || {});
    return this.ok(data);
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/list', { summary: '列表查询' })
  async getList(@Body() body) {
    const data = await this.bintelProductService.list(body || {});
    return this.ok(data);
  }

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    const data = await this.bintelProductService.info(id);
    return this.ok(data);
  }
}
