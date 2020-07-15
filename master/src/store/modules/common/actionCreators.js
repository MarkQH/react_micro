import * as actionTypes from './constant';
import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from "@/api/request";

export const changeBnannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_COMMON_LIST,
  data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const getBannerList = () => {
  return (dispatch) => {
    dispatch(changeBnannerList([1,2,3,4,5]))
    return false;
    getBannerRequest()
      .then(d => {
        dispatch(changeBnannerList(d.banners));
      })
      .catch(() => {
        console.log('轮播图数据获取失败');
      });
  }
};

export const getRecommendList = () => {
  return (dispatch) => {
    dispatch(changeRecommendList([1,2,3,4,5]))
    return false;
    getRecommendListRequest()
      .then(d => {
        dispatch(changeRecommendList(d.result));
        dispatch (changeEnterLoading (false));
      })
      .catch(() => {
        console.log('推荐歌单数据获取失败');
      });
  }
};
