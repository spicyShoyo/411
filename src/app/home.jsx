/**
 * Created by @tourbillon on 3/11/16.
 */

import React from 'react';
import { browserHistory } from 'react-router';

import UIDispatcher from './utils/ui-dispatcher'
import UIEvents from './utils/ui-events'

import HeaderView from './views/header-view'
import HeaderImageGallery from './views/header-image-gallery'
import IntroTagView from './views/intro-tag-view';

import NavBar from './views/navbar'

import UserStore from './stores/user-store';

const styles = {
  tagSection: {
    marginTop: '5px',
    zIndex: 0
  },
  tagTable: {
    width: '100%',
    margin: '0 auto'
  },
  tagTableData: {
    padding: '20px'
  }
};

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.object
  },

  componentWillMount() {
    if (UserStore.username.length !== 0) {
      this.render = () => {
        return false;
      };
      browserHistory.push('/dashboard');
    }
  },

  centralButtonOnClick() {
    UIDispatcher.emit(UIEvents.LOGIN_DIALOG_TOGGLE);
  },

  render() {
    return (
      <div>
        <NavBar
          title="Bacchanalia"
          transparent={true} />
        <HeaderImageGallery />
        <HeaderView centralBtnTap={this.centralButtonOnClick} />
        <section style={styles.tagSection}>
          <table style={styles.tagTable}>
            <tbody>
              <tr>
                <td style={styles.tagTableData}>
                  <IntroTagView
                    imageSrc="http://lorempixel.com/200/150/nature">
                    Ha!
                  </IntroTagView>
                </td>
                <td style={styles.tagTableData}>
                  <IntroTagView
                    imageSrc="http://lorempixel.com/200/150/nature">
                    Ha!
                  </IntroTagView>
                </td>
                <td style={styles.tagTableData}>
                  <IntroTagView
                    imageSrc="http://lorempixel.com/200/150/nature">
                    Ha!
                  </IntroTagView>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    )
  }
});