/**
 * 服务工厂方法
 *
 * Analysis服务
 *
 * @param {Api} api API调用帮助器
 * @param {object} config 系统配置
 * @returns {object} 服务方法
 */
export default function (api, config) {
    return {
        // 登录
        login: function (options) {
            return api.postForm(Object.assign({
                url: '/passport/login'
            }, options));
        },
        // 注销
        logout: function (options) {
            return api.delete(Object.assign({
                url: '/passport/logout'
            }, options));
        },
        // 获取当前登录的用户信息
        current: function (options) {
            return api.get(Object.assign({
                url: '/passport/check'
            }, options));
        },
        getData(options){
            return api.get(Object.assign({
                url:`/reports/${options.data.sampleNo}.json`
            }, options))
        }
    }
}