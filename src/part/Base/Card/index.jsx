import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles)

class Card extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return(
      <div styleName='card'>
        <span styleName='title'>{this.props.title}</span>
        {this.props.children}
      </div>
    )
  }
}
export default Card