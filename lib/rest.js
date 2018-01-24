import axios from 'axios'

let setData = (object, data) => {
  if (typeof object.setData == 'function') return object.setData(item);
  
  for (let [key, value] of Object.entries(data)) {
    if (Reflect.has(object, key)) {
      Reflect.set(object, key, value)
    }
  }
  return object;
}
export default class Rest {

  constructor(query = null) {
    if (query === null) return this;
    
    return new Promise((resolve, reject) => {
      const client = axios.create({
        baseURL: 'https://api.github.com',
        timeout: 5000,
      });
      client.get(`users/${query}`)
      .then(r => {
        const object = setData(this, r.data)
        console.log(this)
        console.log(r.data)
        resolve(object)
      }, r => {
        reject()
      })
    });
  }

  static find(query = null) {
    return new Promise((resolve, reject) => {
      if (query === null) {
        reject()
        return;
      }
      const name = this.name.toLowerCase()
      import(`model/${name}`).then(model => {
        const client = axios.create({
          baseURL: 'https://api.github.com',
          timeout: 5000,
        });
    
        client.get('orgs/ContoneseMorningTea/repos')
        .then(r => {
          const items = r.data.map(item => {
            let object = new (model.default)();
            return setData(object, item);
          })
          resolve(items)
        }, r => {
          reject()
        });
      });
    });
  }

}
