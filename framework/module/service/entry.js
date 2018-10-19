import Api from './api';
import config from './config';
import rootService from './service';

const api = new Api();

const service = rootService(api, config);

export default service

