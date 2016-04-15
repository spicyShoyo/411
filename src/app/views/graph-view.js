import vis from 'vis';
import React from 'react';
import uuid from 'uuid';
import DrinkDetails2 from './drink-details-2';
import api from '../api.jsx';
import UIDispatcher from '../utils/ui-dispatcher'
import UIEvents from '../utils/ui-events'

export default React.createClass({
  getDefaultProps(){
    return {
        graph: {},
        identifier:uuid.v4(),
        style:{width:"100%"}
    };
  },

  getInitialState() {
    return {
      detailsDialogOpen:false,
      details: {
        "drinkname": "220 BTU",
        "category": "Shot",
        "alcohol": "Alcoholic",
        "glass": "Shot glass",
        "likes": 6,
        "num": 8,
        "url": "https://farm6.staticflickr.com/5007/5240760596_d2b5f91bbf.jpg",
        "featured": true
      },
      ingredients:[],
    };
  },

  render() {
    return (
      <div onDoubleClick={this.changeMode} id={this.props.identifier} style={this.props.style}>
        <DrinkDetails2
          open={this.state.detailsDialogOpen}
          details={this.state.details}
          ingredients={this.state.ingredients}
        />
      </div>
    )
      //React.createElement("div", {onDoubleClick: this.changeMode, id: this.props.identifier, style: this.props.style}, this.props.identifier);
  },

  componentDidMount(){
    this.updateGraph();
    UIDispatcher.on(UIEvents.DRINK_DETAILS_TOGGLE_VS, () => {
      this.setState({ detailsDialogOpen: !this.state.detailsDialogOpen });
    });
  },

  componentDidUpdate(){
    this.updateGraph();
  },

  componentWillUnmount() {
    UIDispatcher.removeAllListeners(UIEvents.DRINK_DETAILS_TOGGLE_VS);
  },

  updateGraph(){
    // Container
    let container = document.getElementById(this.props.identifier);

    // Options
    let options = {interaction:{hover:true}};

    let curGraph=this.props.graph;

    let network = new vis.Network(container, this.props.graph, options);
    network.on("click", (params) => {
      for(let i=0; i<curGraph.nodes.length; ++i) {
        if(curGraph.nodes[i].id===params.nodes[0]) {
          let drinkName=curGraph.nodes[i].label;
          api.drinkSearch(drinkName, 'drinkname').then((rows)=> {
            this.setState({ details:  rows.drinks[0]});
            api.getIngredient(drinkName).then((rows)=> {
              this.setState({ ingredients:  rows.ingredients});
              UIDispatcher.emit(UIEvents.DRINK_DETAILS_TOGGLE_VS);
              //this.setState({ detailsDialogOpen: !this.state.detailsDialogOpen });
            })
          });
        }
      }
    });
  },

});
