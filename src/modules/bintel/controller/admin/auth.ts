import {
  CoolController,
  BaseController,
  CoolUrlTag,
  CoolTag,
  TagTypes,
  CoolCommException,
} from '@cool-midway/core';
import { Post, Body, Inject, Config } from '@midwayjs/core';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import * as md5 from 'md5';
import { BaseSysRoleService } from '../../../base/service/sys/role';
import { BaseSysMenuService } from '../../../base/service/sys/menu';
import { BaseSysDepartmentService } from '../../../base/service/sys/department';
import { InjectClient } from '@midwayjs/core';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';

@CoolUrlTag()
@CoolController()
export class BintelAdminAuthController extends BaseController {
  @InjectEntityModel(BaseSysUserEntity)
  baseSysUserEntity: Repository<BaseSysUserEntity>;

  @Inject()
  baseSysRoleService: BaseSysRoleService;

  @Inject()
  baseSysMenuService: BaseSysMenuService;

  @Inject()
  baseSysDepartmentService: BaseSysDepartmentService;

  @InjectClient(CachingFactory, 'default')
  midwayCache: MidwayCache;

  @Config('module.base')
  coolConfig;

  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/login', { summary: '免验证码登录' })
  async login(@Body() body) {
    const { username, password } = body;
    const user = await this.baseSysUserEntity.findOneBy({ username });
    if (!user) throw new CoolCommException('账户或密码不正确~');

    if (user.status === 0 || user.password !== md5(password)) {
      throw new CoolCommException('账户或密码不正确~');
    }

    const roleIds = await this.baseSysRoleService.getByUser(user.id);
    if (_.isEmpty(roleIds)) {
      throw new CoolCommException('该用户未设置任何角色，无法登录~');
    }

    const { expire, refreshExpire } = this.coolConfig.jwt.token;
    const { secret } = this.coolConfig.jwt;

    const generateToken = async (user, roleIds, expire, isRefresh = false) => {
      await this.midwayCache.set(
        `admin:passwordVersion:${user.id}`,
        user.passwordV
      );
      const tokenInfo = {
        isRefresh,
        roleIds,
        username: user.username,
        userId: user.id,
        passwordVersion: user.passwordV,
      };
      return jwt.sign(tokenInfo, secret, { expiresIn: expire });
    };

    const token = await generateToken(user, roleIds, expire);
    const refreshToken = await generateToken(
      user,
      roleIds,
      refreshExpire,
      true
    );

    const perms = await this.baseSysMenuService.getPerms(roleIds);
    const departments = await this.baseSysDepartmentService.getByRoleIds(
      roleIds,
      user.username === 'admin'
    );

    await this.midwayCache.set(`admin:department:${user.id}`, departments);
    await this.midwayCache.set(`admin:perms:${user.id}`, perms);
    await this.midwayCache.set(`admin:token:${user.id}`, token);
    await this.midwayCache.set(`admin:token:refresh:${user.id}`, token);

    return this.ok({
      expire,
      token,
      refreshExpire,
      refreshToken,
    });
  }
}
