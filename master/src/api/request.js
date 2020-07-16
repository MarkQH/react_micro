import { axiosInstance } from "./config";
import { appConfig } from '../mockData';
export const getMenuApi = (data) => {
  return Promise.resolve(appConfig)
  return axiosInstance({
    url: '',
    method: 'post',
    data
  });
};

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

