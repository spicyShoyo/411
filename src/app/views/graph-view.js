import vis from 'vis';
import React from 'react';
import uuid from 'uuid';

export default React.createClass({
  getDefaultProps(){
    return {
        graph: {},
        identifier:uuid.v4(),
        // style:{width:"960px",height:"480px"}
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
    let options = {interaction:{hover:true}};

    let network = new vis.Network(container, this.props.graph, options);
    network.on("click", function (params) {
      // console.log(params);
    });
    network.on("showPopup", function (params) {
        // container.innerHTML = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
    });
  },

});
