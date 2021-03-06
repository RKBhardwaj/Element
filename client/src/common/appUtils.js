import _ from 'lodash';
import { apis } from './config';
import history from '../store/history';
import constants from './constants';

export const getImage = (image, ext) => `${constants.common.IMAGES_PATH}${image}.${ext}`;

export const getApiUrl = (link, params) => {
  let url = apis[link];
  if (params !== null && params !== undefined) {
    const keys = Object.keys(params);
    _.forEach(keys, (key) => {
      url = url.replace(`:${key}`, params[key]);
    });
  }
  return url;
};

export const navigateToRoute = (link) => {
  history.push(link);
};

export const getKeysWithBlankValues = (obj) => {
  const list = [];
  _.forEach(obj, (value, key) => {
    if (value === '') {
      list.push(key);
    }
  });
  return list;
};
