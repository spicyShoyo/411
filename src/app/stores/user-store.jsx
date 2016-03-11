/**
 * Created by @tourbillon on 3/11/16.
 */

class UserStore extends EventEmitter {

  constructor() {
    this._username = '';
    this._token = '';
  }

  get username() { return this._username; }
  
  get token() { return this._token; }

  set username(name) {
    this._username = name;
    this.emit('change');
  }

  set token(tok) { this._token = tok; }
  
}

export default new UserStore();