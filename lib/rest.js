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
    // TODO: 强行使用async仍然sb 后面看看就别用了吧
    if (query === null) return this;
    (async () => {
      const client = axios.create({
        baseURL: 'https://api.github.com',
        timeout: 5000,
      });

      const name = this.constructor.name.toLowerCase()
      let r = await client.get(`${name}/${query}`);
      setData(this, r.data);
    })();
  }

  static find(query = {}, path = null) {
    return new Promise((resolve, reject) => {
      if (query === null) {
        reject()
        return;
      }
      
      const name = this.name.toLowerCase()
      let model;
      import(`model/${name}`)
      .then(m => {
        model = m
        const client = axios.create({
          baseURL: 'https://api.github.com',
          timeout: 5000,
        });
    
        return client.get(path ? path : name)
      })
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
  }

}
