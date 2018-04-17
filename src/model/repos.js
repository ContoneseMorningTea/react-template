import { observable } from 'mobx';
import Rest from 'lib/rest';

export default class Repos extends Rest {
  @observable id = null;
  name = '';
  url = '';
  stargazers_count = 0;

  get stars() {
    return this.stargazers_count;
  }
}
