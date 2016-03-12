/**
 * Created by @tourbillon on 3/11/16.
 */

import React from 'react';

import { LeftNav, Avatar, List, ListItem, FontIcon, FlatButton } from 'material-ui/lib';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/lib/card';
import Colors from 'material-ui/lib/styles/colors';

import UIEvents from './../utils/ui-events';
import UIDispatcher from './../utils/ui-dispatcher';

let styles = {
  avatar: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  cardActions: {
    textAlign: "center"
  }
};

export default class LeftNavBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      name: ''
    };
    this.openLeftNavBar = this.openLeftNavBar.bind(this);
  }

  componentDidMount() {
    UIDispatcher.on(UIEvents.LEFT_NAVBAR_TOGGLE, this.openLeftNavBar);
  }

  componentWillUnmount() {
    UIDispatcher.removeAllListeners(UIEvents.LEFT_NAVBAR_TOGGLE);
  }

  openLeftNavBar() {
    this.setState({ open: !this.state.open });
  }

  render() {
    let nameSection;
    if (this.state.name.length === 0) {
      nameSection =
        <CardActions style={styles.cardActions}>
          <FlatButton label="Log in"
            secondary={true}
            style={styles.actionButton}
            onTouchTap={() => UIDispatcher.emit(UIEvents.LOGIN_DIALOG_TOGGLE)} />
          <FlatButton label="Sign up"
            primary={true}
            style={styles.actionButton}
            onTouchTap={() => UIDispatcher.emit(UIEvents.SIGN_UP_DIALOG_TOGGLE)} />
        </CardActions>;
    }
    else {
      nameSection = <CardText>{ this.state.name }</CardText>;
    }

    return (
      <LeftNav
        docked={false}
        open={this.state.open}
        onRequestChange={open => this.setState({ open })}>
        <Card>
          <CardTitle>
            <Avatar
              size={80}
              style={styles.avatar}>
              {this.state.name.substr(0, 1)}
            </Avatar>
          </CardTitle>
          { nameSection }
        </Card>
        <List>
          <ListItem
            leftIcon={<FontIcon className="material-icons">home</FontIcon>}
            primaryText="Home" />
          <ListItem
            leftIcon={<FontIcon className="material-icons">search</FontIcon>}
            primaryText="Search" />
        </List>
      </LeftNav>
    );
  }

}