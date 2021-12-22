import axios from 'axios'

let request = {
  init({ baseURL = '', timeout = 10000, headers = {}, reqInterceptor, resInterceptor } = {}){
    this.ajax = axios.create({
      baseURL,
      timeout,
      headers,
    })
    reqInterceptor && this.ajax.interceptors.request.use(reqInterceptor, err => Promise.reject(err))
    resInterceptor && this.ajax.interceptors.response.use(resInterceptor, err => Promise.reject(err))
  },

  get(url, data = {}, config = {}) {
    return this.ajax.request({
      url,
      method: 'get',
      params: data,
      headers: config?.headers
    })
  },

  post(url, data = {}, config = {}) {
    return this.ajax.request({
      url,
      method: 'post',
      data,
      headers: config?.headers
    })
  },

  del(url, data = {}, config = {}) {
    return this.ajax.request({
      url,
      method: 'delete',
      params: data,
      headers: config?.headers
    })
  },

  all(promises = [], cbFunc) {
    if (promises.length == 0) {
        return
    }
    return axios.all(promises).then(axios.spread(function(acct, perms) {
        // 所有请求现在都执行完成
        cbFunc(acct, perms)
    }))
  }
}

export default request;
