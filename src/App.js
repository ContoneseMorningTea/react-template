import '../public/css/reset.styl'
import './App.styl'
import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import RouterMap from './router'
import * as store from './store'

class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <RouterMap/>
      </Provider>
    )
  }
}

export default App
