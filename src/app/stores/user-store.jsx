/**
 * Created by @tourbillon on 3/11/16.
 */

import BaseStore from './base-store';

import Identifiers from './../utils/identifiers';

class UserStore extends BaseStore {

  get username() {
    return window.localStorage.getItem(Identifiers.USERNAME_IDENTIFER) || '';
  }
  
  get token() {
    return window.localStorage.getItem(Identifiers.TOKEN_IDENTIFIER) || '';
  }

  set username(name) {
    window.localStorage.setItem(Identifiers.USERNAME_IDENTIFER, name);
    this.emitChanges(name);
  }

  set token(tok) {
    window.localStorage.setItem(Identifiers.TOKEN_IDENTIFIER, tok);
  }
  
}

export default new UserStore();