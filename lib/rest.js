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
      this._client = axios.create({
        baseURL: this._configs ? this._configs.baseURL : 'https://api.github.com',
        timeout: 5000,
      });

      this._name = this._configs ? this._configs.source : this.constructor.name.toLowerCase();
      let r = await this._client.get(`${this._name}/${query}`);
      setData(this, r.data);
    })();
  }

  async save() {
    const params = Object.assign({}, this);
    Reflect.deleteProperty(params, '_configs');
    Reflect.deleteProperty(params, '_client');
    
    if (params.id > 0) return await this._client.post(this._name, params);
    else return await this._client.put(`${this._name}/${params.id}`, params);
  }

  async delete() {
    return await this._client.delete(`${this._name}/${this.id}`);
  }

  static find(query = {}, path = null) {
    return new Promise((resolve, reject) => {
      if (query === null) {
        reject();
        return;
      }
      
      const name = this._configs ? this._configs.source : this.name.toLowerCase();
      let model;
      import(`model/${name}`)
      .then(m => {
        model = m.default
        const client = axios.create({
          baseURL: this._configs ? this._configs.baseURL : 'https://api.github.com',
          timeout: 5000,
        });
    
        return client.get(path ? path : name);
      })
      .then(r => {
        const items = r.data.map(item => {
          let object = new (model)();
          return setData(object, item);
        })
        resolve(items)
      }, r => {
        reject()
      });
    });
  }

}
