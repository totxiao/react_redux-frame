/**
 * 后台API数据结构处理的插件
 *
 * 框架会在必要的时候调用插件的方法，以解释后台返回的数据结构
 *
 * @author timmy
 * @date 2017-08-21
 */

import { message as Message} from 'antd';

const HTTP_UNAUTHORIZED = 401;

export default (appStore)=> {
    return {

        /**
         * 解释用户登录信息的数据结构
         * @param {object} result 后台返回的数据结果
         * @returns {object} 用户信息
         */
        resolveAuthInfo(result) {
            if(!result) {
                return null;
            }

            if(result.data) {
                result = result.data;
            }

            return result;
        },

        /**
         * 处理请求，每次调用后台api的时候，框架
         * 都会调用此方法，可以把这个函数当做钩子使用
         * @param {Api} api api对象
         * @param {object} req 请求对象
         * @returns {object} 修改过的请求对象
         */
        processRequest(api, req) {
            // nothing needs to be done for now
            return req;
        },

        /**
         * 解释后台返回的数据结构
         *
         * 每次调用后台方法获取数据的时候，框架都会
         * 调用此方法，在此方法内解读后台的数据结构
         * 然后转换为框架需要的格式
         *
         * @param {Api} api api对象
         * @param {object} r 后台的原始返回值
         * @param {boolean} reportError 是否报告错误
         * @returns {Promise} 处理的promise
         */
        resolveResult(api, r, reportError) {
            return new Promise((resolve, reject)=> {
                const data = r.data && r.data.result ? r.data.result : r.data;
                //后台如果返回的code是success才是成功，否则需要处理错误
                if(r.code === 'SUCCESS') {
                    resolve({data});
                } else {
                    this._handleError(r, reportError);
                    reject(r);
                }
            });
        },

        /**
         * 处理错误
         * @param {error|string} e 错误信息
         * @param {boolean} reportError 是否报告错误
         * @returns {void}
         */
        _handleError(e, reportError) {
            console.log(Message);
            if(e && e.httpCode === HTTP_UNAUTHORIZED) {
                Message.info('您离开的时间太久，为了安全起见，请重新登录', '未登录')
                    // .then(()=> {
                    //     if(identity) {
                    //         identity.clearAuthInfo();
                    //     }
                    //     window.location.reload();
                    // });
            } else if(e && e.message) {
                Message.error(e.message);
            } else {
                if(reportError) {
                    const message = e && e.error ? e.error
                        : '系统错误,请联系管理员';
                    Message.error(message);
                }
            }
        }
    };
};