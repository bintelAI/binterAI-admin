import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { BintelCaseStudyService } from '../../service/case_study';
import {
  CreateBintelCaseStudyDTO,
  UpdateBintelCaseStudyDTO,
} from '../../dto/case_study';

@CoolController({
  prefix: '/admin/bintel/case_study',
})
export class AdminBintelCaseStudyController extends BaseController {
  @Inject()
  bintelCaseStudyService: BintelCaseStudyService;

  @Post('/add', { summary: '添加' })
  @Validate()
  async create(@Body() body: CreateBintelCaseStudyDTO) {
    return this.ok(await this.bintelCaseStudyService.add(body));
  }

  @Post('/delete', { summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    return this.ok(await this.bintelCaseStudyService.delete(ids));
  }

  @Post('/update', { summary: '更新' })
  @Validate()
  async edit(@Body() body: UpdateBintelCaseStudyDTO) {
    return this.ok(await this.bintelCaseStudyService.update(body));
  }

  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    return this.ok(await this.bintelCaseStudyService.info(id));
  }

  @Post('/list', { summary: '列表' })
  async getList(@Body() body) {
    return this.ok(await this.bintelCaseStudyService.list(body));
  }

  @Post('/page', { summary: '分页' })
  async getPage(@Body() body) {
    return this.ok(await this.bintelCaseStudyService.page(body));
  }
}
