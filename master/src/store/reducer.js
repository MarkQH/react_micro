import { combineReducers } from 'redux-immutable';
import { reducer as commonReducer } from "./modules/common/index";
export default combineReducers ({
  common: commonReducer
});
