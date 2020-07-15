// 导入乾坤函数
import {
  registerMicroApps, // 注册子应用方法
  setDefaultMountApp, // 设默认启用的子应用
  runAfterFirstMounted, // 首个子应用加载完毕回调
  start, // 启动qiankun
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  initGlobalState, // 官方应用间通信
} from "qiankun";

import store from "@/store"; // 基座的store
import { actionCreators as commonTypes } from '@/store/modules/common';
import { genActiveRule } from '@/utils' // 路由监听
import { getMenuApi } from "@/api/request";

/**
 * @name 主应用下发公共资源给子应用
 */

// 导入主应用UI库
//  import LibraryUI from './src/lib/ui';
// 导入主应用工具类库
import libs from '@/lib/js';
// 导入主应用需要响应下发的emit事件函数
import * as emits from '@/utils/childEmit';
// 导入应用间通信工具：呼机
import pager from '@/utils/pager';

// 主应用注册呼机-自定义通信方法
pager.subscribe(v => {
  console.log(`监听到子应用${v.form}发来的消息`, v);
  store.dispatch(commonTypes.changeEnterLoading(false));
});
// 导入乾坤应用通信方法
import appStore from '@/utils/appStore';
// 启动乾坤通信
appStore(initGlobalState);

// 子应用容器
const appContainer = '#subapp-container';

/**
 * @name 申明传递给子应用的数据
 * @param storeData 主应用传递给子应用的数据类信息
 * @param utils 派发给子应用的工具类库
 * @param emits 主应用下发emit函数来收集子应用的数据
 * @param pager 自定义子应用通信的工具
 * @param state 自定义数据
 */

const payload = {
  storeData: store.getters,
  libs,
  emits,
  pager,
  state: {
    message: '老大在呼叫小弟',
    date: new Date()
  }
}

// 导入接口获取子应用注册表
getMenuApi().then(({ data }) => {
  // 验证请求错误
  if (data.code !== 200) {
    wlMessage({
      type: 'error',
      message: "请求错误"
    })
    return;
  }
  // 验证数据有效性
  let _res = data.data || [];
  if (_res.length === 0) {
    wlMessage({
      type: 'error',
      message: "没有可以注册的子应用数据"
    })
    return;
  }
  // 处理菜单
  store.dispatch('menu/setUserMenu', _res);
  // 处理子应用注册表数据
  let apps = []; // 子应用数组盒子
  let defaultApp = null; // 默认注册应用
  let isDev = process.env.NODE_ENV === 'development'; // 根据开发环境|线上环境加载不同entry
  _res.forEach(i => {
    apps.push({
      name: i.module,
      entry: i.entry,
      container: appContainer,
      activeRule: genActiveRule(i.routerBase),
      props: { ...payload, routes: i.children, routerBase: i.routerBase }
    })
    if (i.defaultRegister) defaultApp = i.routerBase;
  });
  // 启用qiankun微前端应用
  initQianKun(apps, defaultApp);
})

/**
 * @name 启动为前端应用
 * @param {Array} list 微应用列表
 * @param {String} defaultApp 默认启动的子应用
 */

const initQianKun = (list, defaultApp) => {

  // 注册子应用
  registerMicroApps(
    list,
    {
      beforeLoad: [
        app => {
          console.log('加载应用前', 'color: green;', app.name);
        },
      ],
      beforeMount: [
        app => {
          console.log('挂在前', 'color: green;', app.name);
        },
      ],
      afterUnmount: [
        app => {
          console.log('挂载后', 'color: green;', app.name);
        },
      ],
    }
  );

  // 设置默认进入的子应用
  setDefaultMountApp(defaultApp);
  // 启动qiankun
  start();
  // 启动后进入第一个子应用后的回调函数
  runAfterFirstMounted(() => {
    console.log('第一个App启动了');
  });
  // 设置全局未捕获异常处理器
  addGlobalUncaughtErrorHandler(event => console.log(event));
}
