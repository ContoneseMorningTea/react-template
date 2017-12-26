import create from './create'
import rpcPost from './axios'
import config from '../../../config'

export const token = params => 
  create(async dispatch => {
    const data = await rpcPost(config.equipment.url, config.equipment.search, params)
    dispatch({
      type: 'SET_TOKEN',
      payload: {
        token: data.token,
        total: data.totalCount
      }
    })
  })

export const fetch = params => 
  create(async dispatch => {
    const data = await rpcPost(config.equipment.url, config.equipment.getlist, params)
    dispatch({
      type: 'SET_TOKEN',
      payload: {
        equipment: data,
        loading: false
      }
    })
  })