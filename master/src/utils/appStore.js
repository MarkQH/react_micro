import store from "@/store";
import { actionCreators as commonTypes } from '@/store/modules/common';
/**
 * 启动乾坤的通信方法
 */
const appStore = (initGlobalState) => {
  /**
   * 初始化数据内容
   */
  const { onGlobalStateChange, setGlobalState } = initGlobalState({
    msg: '来自master初始化的消息',
  });

  /**
   * 监听数据变动
   */
  onGlobalStateChange((value, prev) => {
    console.log('主应用收到广播:', value, prev);
    store.dispatch(commonTypes.changeEnterLoading(value.msg));
  });

  /**
   * 改变数据并广播
   */
  setGlobalState({
    ignore: 'master',
    msg: '来自master动态设定的消息',
  });
}

export default appStore;
