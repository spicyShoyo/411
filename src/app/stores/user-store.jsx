/**
 * Created by @tourbillon on 3/11/16.
 */

import BaseStore from './base-store';

class UserStore extends BaseStore {

  constructor() {
    super();
    this._username = '';
    this._token = '';
  }

  get username() { return this._username; }
  
  get token() { return this._token; }

  set username(name) {
    this._username = name;
    this.emitChanges(name);
  }

  set token(tok) { this._token = tok; }
  
}

export default new UserStore();