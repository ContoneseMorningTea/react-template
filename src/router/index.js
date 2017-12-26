/**
 * To do 懒加载
 * 使用 react-loadable
 * https://yarnpkg.com/zh-Hans/package/react-loadable
 */
import React, { Component } from 'react'

import { 
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Loadable from 'react-loadable'
import Loader from 'page/Loading' 

const Loading = ({ isLoading, error }) => {
  return (
    <Loader/>
  )
}

const asyncHome = Loadable({
  loader: () => import('page/Home'),
  loading: Loading
})
const async401 = Loadable({
  loader: () => import('page/401'),
  loading: Loading
})
// todo 根路由 switch 作用
class RouterMap extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={asyncHome} />
          <Route path='/401' component={async401} />
        </Switch>
      </Router>
    )
  }
}
export default RouterMap