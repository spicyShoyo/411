import vis from 'vis';
import React from 'react';
import uuid from 'uuid';

export default React.createClass({
  getDefaultProps(){
    return {
        graph: {},
        identifier:uuid.v4(),
        style:{width:"640px",height:"480px"}
    };
  },

  render() {
    return React.createElement("div", {onDoubleClick: this.changeMode, id: this.props.identifier, style: this.props.style}, this.props.identifier);
  },

  componentDidMount(){
    this.updateGraph();
  },

  componentDidUpdate(){
    this.updateGraph();
  },

  updateGraph(){
    // Container
    let container = document.getElementById(this.props.identifier);

    // Options
    let options = {};

    let network = new vis.Network(container, this.props.graph, options);
  },

});
