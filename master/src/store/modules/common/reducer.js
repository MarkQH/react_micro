import * as actionTypes from './constant';
import { fromJS } from "immutable";

const defaultState = fromJS({
  bannerList: [],
  commonList: [],
  enterLoading: true,
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_COMMON_LIST:
      return state.set('commonList', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    default:
      return state;
  }
}
