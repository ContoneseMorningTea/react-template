import { observable, action } from 'mobx'

class EquipmentStore {
  @observable equipment = []
  @action async fetch () {
    console.log('sss')
  }
}
const equipment = new EquipmentStore()

export default equipment
