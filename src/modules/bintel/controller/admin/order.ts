import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { BintelOrderService } from '../../service/order';
import { UpdateBintelOrderDTO } from '../../dto/order';

@CoolController({
  prefix: '/admin/bintel/order',
})
export class AdminBintelOrderController extends BaseController {
  @Inject()
  bintelOrderService: BintelOrderService;

  @Post('/delete', { summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    return this.ok(await this.bintelOrderService.delete(ids));
  }

  @Post('/update', { summary: '更新' })
  async edit(@Body() body: UpdateBintelOrderDTO) {
    return this.ok(await this.bintelOrderService.update(body));
  }

  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    return this.ok(await this.bintelOrderService.info(id));
  }

  @Post('/list', { summary: '列表' })
  async getList(@Body() body) {
    return this.ok(await this.bintelOrderService.list(body));
  }

  @Post('/page', { summary: '分页' })
  async getPage(@Body() body) {
    return this.ok(await this.bintelOrderService.page(body));
  }

  @Post('/stats', { summary: '统计' })
  async getStats() {
    return this.ok(await this.bintelOrderService.stats());
  }
}
