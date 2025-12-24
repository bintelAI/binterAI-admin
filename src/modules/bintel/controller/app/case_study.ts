import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { BintelCaseStudyService } from '../../service/case_study';

@CoolController({
  prefix: '/app/bintel/case_study',
})
export class AppBintelCaseStudyController extends BaseController {
  @Inject()
  bintelCaseStudyService: BintelCaseStudyService;

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
