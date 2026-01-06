import { CoolController, BaseController } from '@cool-midway/core';
import { BintelInnovationProductService } from '../../service/innovation_product';
import { Inject, Get, Post, Body, Query, Provide } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import {
  BintelInnovationProductAddDTO,
  BintelInnovationProductUpdateDTO,
  BintelInnovationProductQueryDTO,
} from '../../dto/innovation_product';

/**
 * 创新中心产品管理
 */
@Provide()
@CoolController({
  prefix: '/admin/bintel/innovation_product',
})
export class BintelAdminInnovationProductController extends BaseController {
  @Inject()
  bintelInnovationProductService: BintelInnovationProductService;

  @Post('/add', { summary: '添加创新产品' })
  @Validate()
  async create(@Body() body: BintelInnovationProductAddDTO) {
    const data = await this.bintelInnovationProductService.add(body);
    return this.ok(data);
  }

  @Post('/delete', { summary: '删除创新产品' })
  async remove(@Body('ids') ids: number[] | string) {
    const data = await this.bintelInnovationProductService.delete(ids);
    return this.ok(data);
  }

  @Post('/update', { summary: '更新创新产品' })
  @Validate()
  async edit(@Body() body: BintelInnovationProductUpdateDTO) {
    const data = await this.bintelInnovationProductService.update(body);
    return this.ok(data);
  }

  @Get('/info', { summary: '获取创新产品详情' })
  async getInfo(@Query('id') id: number) {
    const data = await this.bintelInnovationProductService.info(id);
    return this.ok(data);
  }

  @Post('/page', { summary: '创新产品分页查询' })
  @Validate()
  async getPage(@Body() body: BintelInnovationProductQueryDTO) {
    const data = await this.bintelInnovationProductService.page(body || {});
    return this.ok(data);
  }

  @Post('/list', { summary: '创新产品列表查询' })
  @Validate()
  async getList(@Body() body: BintelInnovationProductQueryDTO) {
    const data = await this.bintelInnovationProductService.list(body || {});
    return this.ok(data);
  }
}
