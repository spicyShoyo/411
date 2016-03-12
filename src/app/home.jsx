/**
 * Created by @tourbillon on 3/11/16.
 */

import React from 'react';

import UIDispatcher from './utils/ui-dispatcher'
import UIEvents from './utils/ui-events'

import HeaderView from './views/header-view'
import HeaderImageGallery from './views/header-image-gallery'
import IntroTagView from './views/intro-tag-view';
// import SearchView from './Views/search-view';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/lib/table';

const styles= {
  tag: {
    display: 'inline'
  }
};

export default class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.centralButtonOnClick = this.centralButtonOnClick.bind(this);
  }

  centralButtonOnClick() {
    UIDispatcher.emit(UIEvents.LOGIN_DIALOG_TOGGLE);
  }

  render() {
    return (
      <div>
        <HeaderImageGallery />
        <HeaderView centralBtnTap={this.centralButtonOnClick} />
        <Table>
          <TableRow>
            <TableRowColumn>
              <IntroTagView
                imageSrc="http://lorempixel.com/300/200">
                Ha!
              </IntroTagView>
            </TableRowColumn>
            <TableRowColumn>
              <IntroTagView
                imageSrc="http://lorempixel.com/300/200">
                Ha!
              </IntroTagView>
            </TableRowColumn>
            <TableRowColumn>
              <IntroTagView
                imageSrc="http://lorempixel.com/300/200">
                Ha!
              </IntroTagView>
            </TableRowColumn>
          </TableRow>
        </Table>
      </div>
    )
  }
}
