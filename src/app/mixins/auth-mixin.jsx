/**
 * Created by @tourbillon on 3/14/16.
 */

import UserStore from './../stores/user-store';
import { browserHistory } from 'react-router';

export default {
  componentWillMount() {
    if (UserStore.username.length === 0) {
      this.render = () => {
        return false;
      };
      browserHistory.push('/');
    }
  }
};