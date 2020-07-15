/**
 * @name 用于emit触发主应用事件的函数
 */

import store from "@/store";

import { actionCreators as commonType } from '@/store/modules/common';

function changeDataMsg(data) {
  store.dispatch(commonType.changeBnannerList(data));
};

export {
  changeDataMsg
}
