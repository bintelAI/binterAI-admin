import { CoolController, BaseController } from '@cool-midway/core';
import { Inject, Post, Get, Body, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { BintelSystemSettingService } from '../../service/system_setting';
import {
  CreateBintelSystemSettingDTO,
  UpdateBintelSystemSettingDTO,
} from '../../dto/system_setting';

@CoolController({
  prefix: '/admin/bintel/system_setting',
})
export class AdminBintelSystemSettingController extends BaseController {
  @Inject()
  bintelSystemSettingService: BintelSystemSettingService;

  @Post('/add', { summary: '添加' })
  @Validate()
  async create(@Body() body: CreateBintelSystemSettingDTO) {
    return this.ok(await this.bintelSystemSettingService.add(body));
  }

  @Post('/delete', { summary: '删除' })
  async remove(@Body('ids') ids: number[]) {
    return this.ok(await this.bintelSystemSettingService.delete(ids));
  }

  @Post('/update', { summary: '更新' })
  @Validate()
  async edit(@Body() body: UpdateBintelSystemSettingDTO) {
    return this.ok(await this.bintelSystemSettingService.update(body));
  }

  @Get('/info', { summary: '详情' })
  async getInfo(@Query('id') id: number) {
    return this.ok(await this.bintelSystemSettingService.info(id));
  }

  @Post('/list', { summary: '列表' })
  async getList(@Body() body) {
    return this.ok(await this.bintelSystemSettingService.list(body));
  }

  @Post('/page', { summary: '分页' })
  async getPage(@Body() body) {
    return this.ok(await this.bintelSystemSettingService.page(body));
  }

  @Post('/get_payment_config', { summary: '获取支付配置' })
  async getPaymentConfig() {
    const alipay = await this.bintelSystemSettingService.getByKey(
      'payment_alipay'
    );
    const wechat = await this.bintelSystemSettingService.getByKey(
      'payment_wechat'
    );
    return this.ok({
      alipay: alipay ? JSON.parse(alipay.value) : {},
      wechat: wechat ? JSON.parse(wechat.value) : {},
    });
  }

  @Post('/save_payment_config', { summary: '保存支付配置' })
  async savePaymentConfig(@Body() body) {
    const { type, config } = body;
    if (type === 'alipay') {
      await this.bintelSystemSettingService.saveByKey(
        'payment_alipay',
        JSON.stringify(config),
        'payment',
        '支付宝配置'
      );
    } else if (type === 'wechat') {
      await this.bintelSystemSettingService.saveByKey(
        'payment_wechat',
        JSON.stringify(config),
        'payment',
        '微信支付配置'
      );
    }
    return this.ok();
  }
}
