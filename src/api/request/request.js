import axios from 'axios'
import store from '@/store'

// 设置不同环境下的服务器url
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://hao-api.neoweb.top/'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://hao-api.neoweb.top/'
}

// 请求超时时间
axios.defaults.timeout = 10 * 1000

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.errror(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const { code } = response?.data || {}
      if (code === 110) {
        localStorage.removeItem('token')
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error?.response?.status) {
      switch (error.response.status) {
        case 404:
          console.log(404)
          break

        default:
          break
      }
    }
    return Promise.reject(error.response)
  }
)

/**
 * get请求
 * @param {String} url 请求的url地址
 * @param {*} params 请求时携带的参数
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        ...params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * post请求
 * @param {String} url 请求url地址
 * @param {Object} params 请求时携带的参数
 */
export function post(url, params) {
  const token = localStorage.getItem('token')
  const urlId = store.state.urlId
  // 给每个请求添加token
  params = { ...params, token, urlId: urlId || 0 }
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        ...params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
