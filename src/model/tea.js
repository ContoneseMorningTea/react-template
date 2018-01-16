import { observable } from 'mobx';

export default class Tea {
  id = null;
  @observable name = '';
  
  constructor(query = null) {
    if (query == null) {
      setTimeout(() => {
        this.id = 1;
        this.name = '肠粉';
      }, 1500)
    }
    else {
      setTimeout(() => {
        this.id = 2;
        this.name = '虾饺';
        console.log(this)
      }, 3000)
    }
  }

  save() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('teainside', this);
        resolve(this);
      }, 1500)
    });
  }
}

