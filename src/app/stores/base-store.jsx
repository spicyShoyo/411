/**
 * Created by @tourbillon on 3/11/16.
 */

import EventEmitter from 'events';

export default class BaseStore extends EventEmitter {

  register(callback) {
    this.on('change', callback);
  }

  emitChanges(c) {
    this.emit('change', c);
  }

  removeAll() {
    this.removeAllListeners('change');
  }

}