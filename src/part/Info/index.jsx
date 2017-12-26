import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import Card from 'part/Base/Card'
import { Icon } from 'antd'

@CSSModules(styles, {
  allowMultiple: true
})

class InfoCard extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return(
      <div styleName='container'>
        <Card title={'仪器信息'}>
          <img src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />
          <div>
            <Icon type="book" />
            <span>仪器名称</span>
            <span>硬件</span>
          </div>
          <div>
            <Icon type="user" />
            <span>仪器名称</span>
            <span>硬件</span>
          </div>
          <div>
            <Icon type="phone" />
            <span>仪器名称</span>
            <span>硬件</span>
          </div>
        </Card>
      </div>
    )
  }
}
export default InfoCard