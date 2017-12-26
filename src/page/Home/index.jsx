import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import SearchBar from 'part/SearchBar'
import Item from 'part/Item/Equipment'
import { Button, Spin } from 'antd'
import InfoCard from 'part/Info'

const List = props => {
  const { items } = props 
  if (!items) return false

  const listItems = Object.entries(items).map(e => {
    return <Item  key={e[0]} item={e[1]} id={e[0]} />
  })
  return (
    <ul>{listItems}</ul>
  )
}

@inject('equipment') @observer

class Home extends Component {

  constructor(props) {
    super(props)
    this.props.equipment.fetch()
  }

  // token =  () => {  
  //   const { dispatch } = this.props
  //   // todo return 
  //   Promise.resolve()
  //   .then(() => {
  //     return dispatch(token({
  //       criteria: {
  //         keyword: '',
  //         source_name: 'swu',
  //         area: '全部'
  //       }
  //     }))
  //   })
  //   .then(() => {
  //     console.log(this.props)
  //     dispatch(fetch({
  //       token: this.props.token,
  //       start: this.props.start,
  //       step: this.props.step
  //     }))
  //   })
  // }

  render() {
    return (
      <InfoCard/>
    )
  }
}

export default Home