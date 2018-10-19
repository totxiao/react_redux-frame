/**
 * 分页信息处理插件
 *
 * @author timmy
 * @date 2017-08-21
 */

export default (appStore)=> {
    return {
        /**
         * 包装分页信息
         *
         * 业务代码中执行查询的时候可以在options中
         * 指定分页信息，为了框架数据格式的统一性，分页
         * 参数框架预先定义了标准，但是这个标准跟实际的
         * 后台api并不一致，调用后台时需要转换，但框架并不
         * 知道如何处理分页信息的转换，因此需要由插件来解释
         * 此方法在每次get调用后台查询方法的时候会由
         * 框架调用，在此方法中处理分页信息，将业务代码
         * 中传递的参数转换为后台api需要的格式
         *
         * @param {Api} api api对象
         * @param {object} options api调用时的options
         * @returns {*} 包装过参数
         */
        wrapPageInfo(api, options) {
            if(!options.page && !options.pageSize && !options.orderColumn && !options.orderDirection) {
                return options;
            }
            let pageParams = {};
            if(options.page) {
                pageParams.page = options.page;
            }
            if(options.pageSize) {
                pageParams.size = options.pageSize;
            }

            if(options.orderColumn) {
                const direction = options.orderDirection || 'ASC';
                pageParams.sort = `${options.orderColumn},${direction}`;
            }

            // 把所有分页参数放到url的queryString当中
            options.url = api.buildUrl(options.url, pageParams);

            return options;
        },

        /**
         * 转换后台返回的分页信息
         *
         * 上一个方法是把框架的分页参数转换为后台需要的分页参数
         * 这个方法是把后台返回的分页信息转换为框架需要的分页信息
         *
         * @param {object} result 后台返回的数据
         * @returns {object} 包装过的分页信息
         *
         */
        convertPagination(result) {
            const {sort} = result.data || {};
            let {data} = result;

            data = data || {number: 0, totalElements: 0, size: 10};

            return {
                pagination: {
                    current: data.number + 1,
                    total: data.totalElements,
                    pageSize: data.size
                },
                orderInfo: {
                    orderColumn: sort && sort.property,
                    orderDirection: sort && (sort.direction === 'DESC' ? 'descend' : 'ascend')
                }
            };
        },

        /**
         * 解释后台返回的数据结构
         *
         * 在有分页的情况下，后台返回的数据格式有可能
         * 有差异，因此框架在执行分页查询之后会调用
         * 这个方法，如果存在格式差异，需要在这个方法
         * 中处理，并且返回数据、分页信息、排序信息三
         * 个对象
         *
         * @param {object} result 后台返回的数据
         * @returns {{data, pagination, orderInfo}} 解释后的数据结构
         */
        resolveData(result) {
            const data = (result.data && result.data.content) || result.data;
            const {pagination, orderInfo} = this.convertPagination(result);

            return {data, pagination, orderInfo};
        },

        /**
         * 合并分页和排序信息
         *
         * 在调用后台查询之前，框架需要把分页信息和排序
         * 信息组合成一个参数对象，这个参数对象的格式也
         * 是由插件来处理的
         *
         * @param {object} options 往后台调用的options
         * @param {object} pagination 分页信息
         * @param {object} orderInfo 排序信息
         *
         * @returns {object} 合并后的对象
         */
        mergePageInfo(options, {pagination = {current: 1, pageSize: 10}, orderInfo = {}}) {
            return Object.assign({}, options, {
                page: pagination.current - 1,
                pageSize: pagination.pageSize,
                orderColumn: orderInfo.orderColumn,
                orderDirection: orderInfo.orderDirection === 'descend' ? 'desc' : 'asc'
            });
        }
    };
};