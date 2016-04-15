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
import { Card, CardMedia, CardActions, CardHeader} from 'material-ui/lib/card';


const styles = {
  dialog: {
    overflow: 'auto'
  },
  image: {
    width: '300px',
    height : '300px',
    maxHeight: '100%',
    maxWidth: '100%'
  },
  container: {
    width: '100%',
    height: '50%',
    position: 'relative',
    width: '50%',
    minWidth: 300,
    maxWidth: 450,
    minHeight: 400,
    maxHeight: 1200,
  },
  backgroundMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
    // backgroundImage: 'url("/Poly15.jpg")',
    backgroundSize: '100% auto',
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
      buttons: []};
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
    this.state.buttons=[]
    api.createDrink(UserStore.username).then(res => {
      let resArr = res["ingredients"];
      resArr.forEach(item => {
        this.state.buttons.push(
          <section>
          <RaisedButton
          label={item["ingredientname"]}
          keyboardFocused={true}>
          </RaisedButton>
          </section>)
        })
        this.setState({buttons: this.state.buttons});
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
        <br/>
        {this.state.buttons}
      </Card>
      </Dialog>
      </section>
    );
  }
}
