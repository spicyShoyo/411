import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import api from '../api.jsx';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import UserStore from '../stores/user-store';
import { Card, CardMedia, CardText, CardActions, CardHeader} from 'material-ui/lib/card';


const styles = {
  dialog: {
    overflow: 'auto'
  },
  table: {
    width: '100%'
  },
  image: {
    width: '300px',
    height : '300px',
    maxHeight: '100%',
    maxWidth: '100%'
  },
  view: {
    background: 'transparent',
    marginTop:-36,
  },
  titleView: {
    minHeight: '200px',
  },
  floatingButton: {
    position: 'fixed',
    bottom: '150px',
    right: '30px'
  }
}

export default class CreateDrinkView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      url: "",
      ingredientsRow: []};
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.createDrinkRequest = this.createDrinkRequest.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
    this.createDrinkRequest()
  }

  handleClose() {
    this.setState({open: false})
  }

  createDrinkRequest() {
    this.state.ingredientsRow=[]
    api.createDrink(UserStore.username).then(res => {
      let resArr = res["ingredients"];
      resArr.forEach(item => {
        this.state.ingredientsRow.push(
          <tr>
            <td>{item.ingredientname}</td>
            <td>{item.amount}</td>
            <td>{item.unit}</td>
          </tr>
        );
      })
      this.setState({ingredientsRow: this.state.ingredientsRow});
    })
    api.randomUrl().then(res => {
      this.setState({url: res["url"][0]["url"]});
    })
  }

  render() {
    return (
      <section>
        <RaisedButton
          label="Create New Drink"
          style={styles.floatingButton}
          onClick={this.handleOpen}>
          <ContentAdd/>
        </RaisedButton>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleClose}
          bodyStyle={styles.dialog}>
          <Card>
            <CardHeader
              title="Create New Drink"
            />
            <CardMedia>
              <img style={styles.image} src={this.state.url}/>
            </CardMedia>
            <CardActions>
              <FlatButton
                label="Cancel"
                primary={false}
                keyboardFocused={false}
                onTouchTap={this.handleClose}
              />
            </CardActions>
            <CardText>
              <table style={styles.table}>
              <thead>
                <tr>
                  <th><h3>Name</h3></th>
                  <th><h3>Amount</h3></th>
                  <th><h3>Unit</h3></th>
                </tr>
              </thead>
              <tbody>
                {this.state.ingredientsRow}
              </tbody>
              </table>
            </CardText>
          </Card>
        </Dialog>
      </section>
    );
  }
}
