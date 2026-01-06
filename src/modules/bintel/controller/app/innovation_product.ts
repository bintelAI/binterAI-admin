import { CoolController, BaseController,CoolTag, TagTypes } from '@cool-midway/core';
import { BintelInnovationProductService } from '../../service/innovation_product';
import { Inject, Post, Body, Provide } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { BintelInnovationProductQueryDTO } from '../../dto/innovation_product';

/**
 * 创新中心产品（前端应用）
 */
@Provide()
@CoolController({
  prefix: '/app/bintel/innovation_product',
})
export class BintelAppInnovationProductController extends BaseController {
  @Inject()
  bintelInnovationProductService: BintelInnovationProductService;
  
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/list', { summary: '创新产品列表查询' })
  @Validate()
  async getList(@Body() body: BintelInnovationProductQueryDTO) {
    const data = await this.bintelInnovationProductService.list(body || {});
    return this.ok(data);
  }
}
