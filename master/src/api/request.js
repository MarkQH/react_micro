import { axiosInstance } from "./config";

export const getMenuApi = (data) => {
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

