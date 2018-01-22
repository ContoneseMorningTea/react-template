import { observable } from 'mobx';
import Rest from 'lib/rest';

export default class Repo extends Rest {
  id = null;
  @observable name = '';
}

