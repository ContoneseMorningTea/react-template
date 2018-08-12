import axios from 'axios';

class Client {
  clients = {};

  get(name = null) {
    let client = Reflect.get(this.clients, name);
    if (client == null) {
      client = axios.create({});
      Reflect.set(this.clients, name, client);
    }
    return client;
  }
}

export default new Client();
