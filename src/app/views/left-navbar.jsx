/**
 * Created by @tourbillon on 3/11/16.
 */

import React from 'react';

import { LeftNav, Avatar, List, ListItem, FontIcon, FlatButton } from 'material-ui/lib';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/lib/card';
import { Link } from 'react-router';
import Colors from 'material-ui/lib/styles/colors';

import NavLink from './nav-link';
import UIEvents from './../utils/ui-events';
import UIDispatcher from './../utils/ui-dispatcher';
import UserStore from './../stores/user-store';

let styles = {
  avatar: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  cardActions: {
    textAlign: "center"
  },
  cardText: {
    textAlign: "center",
    fontSize: '25px'
  }
};

export default class LeftNavBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      name: UserStore.username
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.openLeftNavBar = this.openLeftNavBar.bind(this);
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object
    };
  }

  componentDidMount() {
    UIDispatcher.on(UIEvents.LEFT_NAVBAR_TOGGLE, this.openLeftNavBar);
    UserStore.register(this.handleNameChange);
  }

  componentWillUnmount() {
    UIDispatcher.removeAllListeners(UIEvents.LEFT_NAVBAR_TOGGLE);
    UserStore.remove(this.handleNameChange);
  }

  handleNameChange(name) {
    this.setState({ name: name });
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
            onTouchTap={() => UIDispatcher.emit(UIEvents.LOGIN_DIALOG_TOGGLE)} />
          <FlatButton label="Sign up"
            primary={true}
            onTouchTap={() => UIDispatcher.emit(UIEvents.SIGN_UP_DIALOG_TOGGLE)} />
        </CardActions>;
    }
    else {
      nameSection = [
          <CardTitle
            key={0}
            style={styles.cardText}
            actAsExpander={true}
            showExpandableButton={true}
            title={this.state.name} />,
          <CardActions
            key={1}
            style={styles.cardActions}
            expandable={true}>
            <FlatButton
              onTouchTap={() => {
                UserStore.username = '';
                UserStore.token = '';
              }}
              label="Log out" />
          </CardActions>
      ];
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
          <NavLink to="/">
            <ListItem
              leftIcon={<FontIcon className="material-icons">home</FontIcon>}
              primaryText="Home">
            </ListItem>
          </NavLink>
          <NavLink to="/a">
            <ListItem
              leftIcon={<FontIcon className="material-icons">search</FontIcon>}
              primaryText="Search" />
          </NavLink>
        </List>
      </LeftNav>
    );
  }

}