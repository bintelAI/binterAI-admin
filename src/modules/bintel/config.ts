import { ModuleConfig } from '@cool-midway/core';
import { BintelAuthorityMiddleware } from './middleware/authority';

export default () => {
  return {
    // 模块名称
    name: '方块智联业务模块',
    // 模块描述
    description: 'BintelAI 核心业务模块',
    // 中间件，路由等配置
    middlewares: [BintelAuthorityMiddleware],
    // 模块加载顺序，默认为0
    order: 0,
  } as ModuleConfig;
};
