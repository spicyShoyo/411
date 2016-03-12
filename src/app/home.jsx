/**
 * Created by @tourbillon on 3/11/16.
 */

import React from 'react';

import UIDispatcher from './utils/ui-dispatcher'
import UIEvents from './utils/ui-events'

import HeaderView from './views/header-view'
import HeaderImageGallery from './views/header-image-gallery'
//import IntroTagView from './views/intro-tag-view';
// import SearchView from './Views/search-view'

export default class Home extends React.Component {

  centralButtonOnClick() {
    UIDispatcher.emit(UIEvents.LOGIN_DIALOG_TOGGLE);
  }

  render() {
    return (
      <div>
        <HeaderImageGallery />
        <HeaderView centralBtnTap={this.centralButtonOnClick} />
      </div>
    )
  }
}