import axios from 'axios'

export default class Rest {

  static find(query = null) {
    return new Promise((resolve, reject) => {
      if (query === null) {
        reject()
        return;
      }
      const name = this.name.toLowerCase()
      import(`model/${name}`).then(model => {
        const Object = model.default;
        const client = axios.create({
          baseURL: 'https://api.github.com',
          timeout: 5000,
        });
    
        client.get('orgs/ContoneseMorningTea/repos')
        .then(r => {
          const items = r.data.map(item => {
            let object = new Object();
            object.id = item.id;
            object.name = item.name;
            return object;
          })
          resolve(items)
        }, r => {
          reject()
        });
      });
    });
  }

}
