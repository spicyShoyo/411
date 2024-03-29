/**
 * Created by @tourbillon on 3/15/16.
 */

import React from 'react';
import { Dialog, FlatButton, Tabs, Tab } from 'material-ui/lib';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/lib/card';

import UIDispatcher from './../utils/ui-dispatcher';
import UIEvents from './../utils/ui-events';

import { browserHistory } from 'react-router';

const styles = {
  dialog: {
    overflow: 'auto'
  },
  drinkSummary: {
    float: 'left'
  },
  table: {
    width: '100%'
  },
  div: {
    display: 'inline'
  },
  image: {
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

  onClickSimilarDrink() {
    browserHistory.push(`/recommend?drinkname=${this.props.details.drinkname}`);
  },

  render() {
    const actions = [
      <FlatButton
        secondary={true}
        label="Close"
        onTouchTap={() => UIDispatcher.emit(UIEvents.DRINK_DETAILS_TOGGLE)} />
    ];
    const ingredientsRow = [];
    this.props.ingredients.forEach(i => {
      ingredientsRow.push(
        <tr>
          <td>{i.ingredientname}</td>
          <td>{i.amount}</td>
          <td>{i.unit}</td>
        </tr>
      );
    });

    return (this.props.details === null) ? null : (
      <Dialog
        open={this.props.open}
        actions={actions}
        bodyStyle={styles.dialog}>
        <Card>
          <CardMedia
            overlay={<CardTitle title={this.props.details.drinkname}/>}>
            <img style={styles.image} src={this.props.details.url}/>
          </CardMedia>
          <CardText>
            <Tabs>
              <Tab label="Summary">
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th><h3>Category</h3></th>
                      <th><h3>Alcohol Type</h3></th>
                      <th><h3>Glass</h3></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.details.category}</td>
                      <td>{this.props.details.alcoholic ? 'Alcoholic' : 'Shots'}</td>
                      <td>{this.props.details.glass}</td>
                    </tr>
                  </tbody>
                </table>
              </Tab>
              <Tab label="Ingredients">
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th><h3>Name</h3></th>
                      <th><h3>Amount</h3></th>
                      <th><h3>Unit</h3></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientsRow}
                  </tbody>
                </table>
              </Tab>
            </Tabs>
          </CardText>
        </Card>
        <FlatButton
          label="Similar Drinks"
          onClick={this.onClickSimilarDrink}
          secondary={true}
        />
      </Dialog>
    );
  }

});
