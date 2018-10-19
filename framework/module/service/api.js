import params from './params';
import PageInfoProvider from './page-info-provider';
import ApiDataHandler from './api-data-handler';
import config from './config';

/*
 * Api: 后台调用处理帮助类
 */
class Api {
    /**
     * 构造器
     * @param {props} props 全局数据store
     */
    constructor(props) {
        this.params = params;
        this.pageInfoProvider = PageInfoProvider();
        this.apiDataHandler = ApiDataHandler();
        this.config = config
    }

    /**
     * 执行GET调用
     * @param {object} options 调用属性
     * @returns {promise} 异步操作的promise
     */
    get(options) {
        return this._sendUrl('GET', options, true);
    }

    /**
     * 执行POST JSON调用
     * @param {object} options 调用属性
     * @returns {promise} 异步操作的promise
     */
    post(options) {
        return this._sendJson('POST', options);
    }

    /**
     * 执行PUT JSON调用
     * @param {object} options 调用属性
     * @returns {promise} 异步操作的promise
     */
    put(options) {
        return this._sendJson('PUT', options);
    }

    /**
     * 执行POST FORM调用
     * @param {object} options 调用属性
     * @returns {promise} 异步操作的promise
     */
    postForm(options) {
        return this._sendForm('POST', options);
    }

    /**
     * 执行PUT FORM调用
     * @param {object} options 调用属性
     * @returns {promise} 异步操作的promise
     */
    putForm(options) {
        return this._sendForm('PUT', options);
    }

    /**
     * 执行DELETE (JSON)调用
     * @param {object} options 调用属性
     * @returns {promise} 异步操作的promise
     */
    delete(options) {
        return this._sendJson('DELETE', options, false);
    }

    /**
     * 执行DELETE FORM调用
     * @param {object} options 调用属性
     * @returns {promise} 异步操作的promise
     */
    deleteForm(options) {
        return this._sendForm('DELETE', options, false);
    }

    /**
     * 包装分页信息
     * @param {object} options 调用参数
     * @returns {object} 包装过的调用参数
     */
    wrapPageInfo(options) {
        return this.pageInfoProvider.wrapPageInfo(this, options);
    }

    /**
     * 把参数加到url的query string中
     * @param {string} url 原来的url
     * @param {array|object} parameters 要加的参数列表
     * @returns {string} 改变后的url
     */
    buildUrl(url, parameters) {
        if(!url) {
            url = '/';
        }
        url += url.indexOf('?') > 0 ? '&' : '?';
        url += params(parameters);
        return url;
    }

    /**
     * 发起body为json格式的异步调用
     * @param {string} method POST|PUT|DELETE
     * @param {object} options 调用参数
     * @param {boolean} wrapPageInfo 是否需要包装分页参数
     * @returns {promise} 异步操作的promise
     * @private
     */
    _sendJson(method, options, wrapPageInfo = true) {
        return this._sendBody(method, Api.APPLICATION_JSON, options, JSON.stringify, wrapPageInfo);
    }

    /**
     * 发起body为form-url-encoded格式的异步调用
     * @param {string} method POST|PUT|DELETE
     * @param {object} options 调用参数
     * @param {boolean} wrapPageInfo 是否需要包装分页参数
     * @returns {promise} 异步操作的promise
     * @private
     */
    _sendForm(method, options, wrapPageInfo = true) {
        return this._sendBody(method, Api.FORM_URL_ENCODED, options, params, wrapPageInfo);
    }

    /**
     * 发起包含body的异步调用
     * @param {string} method POST|PUT|DELETE
     * @param {string} contentType body content type
     * @param {object} options 调用参数
     * @param {function} bodySerializeMethod body序列化的回调函数
     * @param {boolean} wrapPageInfo 是否需要包装分页信息
     * @returns {promise} 异步操作的promise
     * @private
     */
    _sendBody(method, contentType, options, bodySerializeMethod, wrapPageInfo) {
        if(typeof options === 'string') {
            options = {url: options, data: arguments[1]};
        }

        if(wrapPageInfo) {
            options = this.wrapPageInfo(options);
        }

        if(options.data) {
            options.data = bodySerializeMethod(options.data);
        }

        return this._exec(Object.assign({}, options, {
            method: method,
            headers: {
                'Content-Type': contentType
            }
        }));
    }

    /**
     * 发起没有body的异步调用
     * @param {string} method 目前只有GET
     * @param {object} options 调用参数
     * @param {boolean} wrapPageInfo 是否需要包装分页参数
     * @returns {promise} 异步调用的promise
     * @private
     */
    _sendUrl(method, options, wrapPageInfo) {
        if(typeof options === 'string') {
            options = {url: options};
        }

        if(wrapPageInfo) {
            options = this.wrapPageInfo(options);
        }

        let {url} = options;
        if(options.data) {
            url = this.buildUrl(url, options.data);
        }
        options.url = url;

        return this._exec(Object.assign({}, options, {method: method}));
    }

    /**
     * 执行异步调用
     * @param {object} options 调用参数
     * @returns {Promise} 异步调用的promise
     * @private
     */
    _exec(options) {
        // api根路径
        const {apiRoot} = this.config;

        // 组装url
        let url = options.url.startsWith('http')
            ? options.url
            : (options.url.startsWith('/') ? apiRoot + options.url : apiRoot + '/' + options.url);
        // 默认会报告错误信息，可以通过在options里面传递一个参数禁止报告错误，执行静默操作
        const reportError = options.reportError || true;

        // 返回一个promise
        return new Promise((resolve, reject)=> {
            // 包装request数据传给插件做预处理
            let requestData = {
                url,
                options: {
                    method: options.method,
                    headers: Object.assign({}, options.headers),
                    credentials: 'include',
                    body: options.data && options.method !== 'GET' ? options.data : undefined
                }
            };
            // 先调用API处理的插件做预处理
            Promise.resolve(this.apiDataHandler.processRequest(this, requestData))
                .then((req)=> {
                    // 预处理过的数据调用fetch执行异步操作
                    ///TODO: 目前服务器返回的数据只支持JSON格式
                    fetch(req.url, req.options)
                        .then((response)=> response.json())
                        .then((result)=> {
                            // 调用插件的方法解析服务器返回的JSON结果
                            Promise.resolve(this.apiDataHandler.resolveResult(this, result, reportError))
                                .then(resolve, reject);
                        }).catch(function (ex) {
                        reject(ex);
                    });
                });
        });
    }
}

// Content types的常量
Api.FORM_URL_ENCODED = 'application/x-www-form-urlencoded; charset=utf-8';
Api.APPLICATION_JSON = 'application/json; charset=utf-8';

export default Api;