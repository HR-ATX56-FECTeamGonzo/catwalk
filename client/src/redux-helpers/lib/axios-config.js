import axios from 'axios';
import { throttleAdapterEnhancer, retryAdapterEnhancer } from 'axios-extensions';
import key from '../../config/config.js';

const request = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/',
  headers: {'Authorization': key},
  adapter: throttleAdapterEnhancer(axios.defaults.adapter)
});
request.CancelToken = axios.CancelToken;
request.isCancel = axios.isCancel;

export default request;