import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { BintelProductPlanService } from '../../service/product_plan';

@CoolController({
  prefix: '/app/bintel/product_plan',
})
export class AppBintelProductPlanController extends BaseController {
  @Inject()
  bintelProductPlanService: BintelProductPlanService;

  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    return this.ok(await this.bintelProductPlanService.info(id));
  }

  @Post('/list', { summary: '列表' })
  async getList(@Body() body) {
    return this.ok(await this.bintelProductPlanService.list(body));
  }

  @Post('/page', { summary: '分页' })
  async getPage(@Body() body) {
    return this.ok(await this.bintelProductPlanService.page(body));
  }
}
