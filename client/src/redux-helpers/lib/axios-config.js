import axios from 'axios';
import key from '../../config/config.js';

const request = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/',
  headers: {'Authorization': key}
});

export default request;