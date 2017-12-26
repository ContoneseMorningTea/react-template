import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
// 全局开启
@CSSModules(styles, {
  allowMultiple: true
})

class Item extends Component {
  constructor (props) {
    super(props)    
  }
  render () {
    const { img, name, user, compony } = this.props.item
    return (
      <div styleName='equipment'>
        <img src={img}/>
        <div styleName='content'>
          <div styleName='tags'>
            <p styleName='tag reserv'>可预约</p>
            <p styleName='tag sample'>可送样</p>
          </div>
          <p>{name}</p>
          <p>{user}</p>
          <p>{compony}</p>
        </div>
      </div>
    )
  }
}
export default Item