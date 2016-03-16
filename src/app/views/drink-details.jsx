/**
 * Created by @tourbillon on 3/15/16.
 */

import React from 'react';
import { Dialog, FlatButton } from 'material-ui/lib';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/lib/card';

import UIDispatcher from './../utils/ui-dispatcher';
import UIEvents from './../utils/ui-events';

const styles = {
  dialog: {
  },
  cardMedia: {
    maxHeight: '10%'
  },
  div: {
    display: 'inline'
  },
  image: {
    marginLeft: '60px',
    width: '300px',
    height : '300px',
    maxHeight: '100%',
    maxWidth: '100%'
  },
  title: {
    textAlign: 'right',
    marginTop: 0
  },
  contentDiv: {
    paddingTop: '10px',
    paddingRight: '10px',
    float: 'right'
  }
};

export default React.createClass({

  render() {
    const actions = [
      <FlatButton
        secondary={true}
        label="Close"
        onTouchTap={() => UIDispatcher.emit(UIEvents.DRINK_DETAILS_TOGGLE)} />
    ];
    return (
      <Dialog
        open={this.props.open}
        actions={actions}
        style={styles.dialog}>
        <h1 style={styles.title}>{this.props.details.drinkname}</h1>
        <img style={styles.image} src={this.props.details.url} />
        <div style={styles.contentDiv}>
          <h3>Category</h3>
          <h5>{this.props.details.category}</h5>
          <h3>Alcohol Type?</h3>
          <h5>{this.props.details.alcoholic ? 'Alcoholic' : 'Shots'}</h5>
          <h3>Glass</h3>
          <h5>{this.props.details.glass}</h5>
        </div>
      </Dialog>
    );
  }

});