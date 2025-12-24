import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { BintelNewsService } from '../../service/news';
import { CreateBintelNewsDTO, UpdateBintelNewsDTO } from '../../dto/news';

@CoolController({
  prefix: '/admin/bintel/news',
})
export class AdminBintelNewsController extends BaseController {
  @Inject()
  bintelNewsService: BintelNewsService;

  @Post('/add', { summary: '添加' })
  @Validate()
  async create(@Body() body: CreateBintelNewsDTO) {
    return this.ok(await this.bintelNewsService.add(body));
  }

  @Post('/delete', { summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    return this.ok(await this.bintelNewsService.delete(ids));
  }

  @Post('/update', { summary: '更新' })
  @Validate()
  async edit(@Body() body: UpdateBintelNewsDTO) {
    return this.ok(await this.bintelNewsService.update(body));
  }

  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    return this.ok(await this.bintelNewsService.info(id));
  }

  @Post('/list', { summary: '列表' })
  async getList(@Body() body) {
    return this.ok(await this.bintelNewsService.list(body));
  }

  @Post('/page', { summary: '分页' })
  async getPage(@Body() body) {
    return this.ok(await this.bintelNewsService.page(body));
  }
}
