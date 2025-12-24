import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { BintelProductService } from '../../service/product';
import {
  CreateBintelProductDTO,
  UpdateBintelProductDTO,
} from '../../dto/product';

@CoolController({
  prefix: '/admin/bintel/product',
})
export class AdminBintelProductController extends BaseController {
  @Inject()
  bintelProductService: BintelProductService;

  @Post('/add', { summary: '添加' })
  @Validate()
  async create(@Body() body: CreateBintelProductDTO) {
    return this.ok(await this.bintelProductService.add(body));
  }

  @Post('/delete', { summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    return this.ok(await this.bintelProductService.delete(ids));
  }

  @Post('/update', { summary: '更新' })
  @Validate()
  async edit(@Body() body: UpdateBintelProductDTO) {
    return this.ok(await this.bintelProductService.update(body));
  }

  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    return this.ok(await this.bintelProductService.info(id));
  }

  @Post('/list', { summary: '列表' })
  async getList(@Body() body) {
    return this.ok(await this.bintelProductService.list(body));
  }

  @Post('/page', { summary: '分页' })
  async getPage(@Body() body) {
    return this.ok(await this.bintelProductService.page(body));
  }
}
