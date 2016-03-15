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
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5px',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  tagTable: {
    margin: '0 auto'
  },
  tagTableData: {
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
    paddingRight: '10px'
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
                    imageSrc="http://lorempixel.com/300/200/nature">
                    Ha!
                  </IntroTagView>
                </td>
                <td style={styles.tagTableData}>
                  <IntroTagView
                    imageSrc="http://lorempixel.com/300/200/nature">
                    Ha!
                  </IntroTagView>
                </td>
                <td style={styles.tagTableData}>
                  <IntroTagView
                    imageSrc="http://lorempixel.com/300/200/nature">
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