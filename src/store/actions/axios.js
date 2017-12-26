import axios from 'axios'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory({
  forceRefresh: true
})

const Axios = axios.create({
  withCredentials: true,
  timeout: 20000
})

Axios.interceptors.response.use(
  res => {
    if (res.data.code === '401') history.push('/401')
    return res
  }
)

const rpcPost = (url, method, params) => {
  return axios.post(url, {
    jsonrpc: '2.0',
    method,
    id: 1,
    params
  }).then(res => {
    return res.data.result
  })
}

export default rpcPost