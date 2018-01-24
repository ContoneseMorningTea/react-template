import { observable } from 'mobx';
import Rest from 'lib/rest';

export default class User extends Rest {
  @observable id = null;
  @observable name = '';
  @observable login = '';
  @observable avatar_url = '';
}
