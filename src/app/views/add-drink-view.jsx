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

const styles = {
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
    bottom: '50px',
    right: '50px'
  }
}

export default class AddDrinkView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      drinkName: "",
      category: "",
      glass: "",
      hintText: "Search for Ingredient",
      drinkNameError: "",
      ingredientNames: [],
      categorySource: [],
      glassSource: [],
      ingredientSource: [],
      buttons: []};
      this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
      this.categoryUpdateInput = this.categoryUpdateInput.bind(this);
      this.categoryNewRequest = this.categoryNewRequest.bind(this);
      this.glassUpdateInput = this.glassUpdateInput.bind(this);
      this.glassNewRequest = this.glassNewRequest.bind(this);
      this.ingredientUpdateInput = this.ingredientUpdateInput.bind(this);
      this.ingredientNewRequest = this.ingredientNewRequest.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleEnterKeyDown(t) {
    if (t === '')
      this.setState({drinkName: "Drink name cannot be empty!"})
  }

  categoryUpdateInput(t) {
    this.setState({categorySource: []});
    if (t === '')
      return;
    api.categoryTyped(t).then(res => {
      let resArr = res["drinks"];
      let newArr = [];
      for (let i = 0; i < resArr.length; ++i) {
        newArr.push(resArr[i]["category"]);
        console.log(resArr[i]["category"]);
      }
      this.setState({categorySource: newArr});
    })
  }

  categoryNewRequest(t) {
    if (t !== '')
      this.setState({category: t});
  }

  glassUpdateInput(t) {
    this.setState({glassSource: []});
    if (t === '')
      return;
    api.glassTyped(t).then(res => {
      let resArr = res["drinks"];
      let newArr = [];
      for (let i = 0; i < resArr.length; ++i) {
        newArr.push(resArr[i]["glass"]);
        console.log(resArr[i]["glass"]);
      }
      this.setState({glassSource: newArr});
    })
  }

  glassNewRequest(t) {
    if (t !== '')
      this.setState({glass: t});
  }

  ingredientUpdateInput(t) {
    this.setState({ingredientSource: []});
    if (t === '')
      return;
    api.ingredientTyped(t).then(res => {
      let resArr = res["ingredients"];
      let newArr = [];
      for (let i = 0; i < resArr.length; ++i) {
        newArr.push(resArr[i]["ingredientname"]);
        console.log(resArr[i]["ingredientname"]);
      }
      this.setState({ingredientSource: newArr});
    })
  }

  ingredientNewRequest(t) {
    if (t !== '') {
      api.addIngredient(this.state.drinkName, t);
      this.setState({ingredientNames: this.state.ingredientNames.concat(t)});
      console.log(this.state.ingredientNames);
      let newButton =
        <section>
          <RaisedButton label={t} onClick={()=> {
              for(let i=0; i<this.state.buttons.length; ++i) {
                if(this.state.buttons[i].props.children.props.label===t) {
                  this.state.buttons.splice(i, 1);
                  this.setState({buttons: this.state.buttons});
                }
              }
            }}>
          </RaisedButton>
        </section>;
      this.state.buttons.push(newButton);
      this.setState({buttons: this.state.buttons});
      }
  }

  handleSubmit() {
    api.addDrink(this.state.drinkName, this.state.category, this.state.glasss).then(res => {
      alert(res["drinks"])
    });
  }

  render() {
    return (
      <section>
      <FloatingActionButton
          label="Create Drink"
          style={styles.floatingButton}
          onClick={this.handleOpen}>
        <ContentAdd/>
      </FloatingActionButton>
        <Dialog
          contentStyle={styles.container}
          title="Create Drink"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          actions={[
            <FlatButton
              label="Cancel"
              primary={false}
              keyboardFocused={false}
              onTouchTap={this.handleClose}
            />,
            <FlatButton
              label="Create New Drink"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleSubmit}
            />,
          ]}
        >
          <section style={styles.backgroundMask}>
          </section>
          <section style={styles.view}>
          <TextField hintText="Enter New Drink Name"
                     onEnterKeyDown={this.handleEnterKeyDown}
                     errorText={this.state.drinkNameError}
          />
          <br/>
          <AutoComplete hintText="Search Category"
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={this.state.categorySource}
                        onUpdateInput={this.categoryUpdateInput}
                        onNewRequest={this.categoryNewRequest}
          />
          <br/>
          <AutoComplete hintText="Search Glass"
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={this.state.glassSource}
                        onUpdateInput={this.glassUpdateInput}
                        onNewRequest={this.glassNewRequest}
          />
          <br/>
          <AutoComplete hintText="Add Ingredient"
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={this.state.ingredientSource}
                        onUpdateInput={this.ingredientUpdateInput}
                        onNewRequest={this.ingredientNewRequest}
          />
          <br/>
          {this.state.buttons}
          </section>
        </Dialog>
      </section>
    );
  }
}
