import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { BintelProductPlanService } from '../../service/product_plan';
import {
  CreateBintelProductPlanDTO,
  UpdateBintelProductPlanDTO,
} from '../../dto/product_plan';

@CoolController({
  prefix: '/admin/bintel/product_plan',
})
export class AdminBintelProductPlanController extends BaseController {
  @Inject()
  bintelProductPlanService: BintelProductPlanService;

  @Post('/add', { summary: '添加' })
  @Validate()
  async create(@Body() body: CreateBintelProductPlanDTO) {
    return this.ok(await this.bintelProductPlanService.add(body));
  }

  @Post('/delete', { summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    return this.ok(await this.bintelProductPlanService.delete(ids));
  }

  @Post('/update', { summary: '更新' })
  @Validate()
  async edit(@Body() body: UpdateBintelProductPlanDTO) {
    return this.ok(await this.bintelProductPlanService.update(body));
  }

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
