import { CoolController, BaseController } from '@cool-midway/core';
import { BintelOrderService } from '../../service/order';
import { Inject, Get, Post, Body, Query, Provide } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { CreateBintelOrderDTO } from '../../dto/order';

@Provide()
@CoolController({
  prefix: '/app/bintel/order',
})
export class AppBintelOrderController extends BaseController {
  @Inject()
  bintelOrderService: BintelOrderService;

  @Post('/add', { summary: '创建订单' })
  @Validate()
  async createOrder(@Body() body: CreateBintelOrderDTO) {
    const data = await this.bintelOrderService.add(body);
    return this.ok(data);
  }

  @Post('/page', { summary: '分页查询' })
  async getPage(@Body() body) {
    const data = await this.bintelOrderService.page(body || {});
    return this.ok(data);
  }

  @Post('/list', { summary: '列表查询' })
  async getList(@Body() body) {
    const data = await this.bintelOrderService.list(body || {});
    return this.ok(data);
  }

  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    const data = await this.bintelOrderService.info(id);
    return this.ok(data);
  }
}
