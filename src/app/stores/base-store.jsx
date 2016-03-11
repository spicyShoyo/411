/**
 * Created by @tourbillon on 3/11/16.
 */

export default class BaseStore extends EventEmitter {

  register(callback) { this.on('change', callback); }

}