//this file is to save the original version, use graph-view.js instead

import vis from 'vis';
import React from 'react';
import uuid from 'uuid';

class Graph extends React.Component{
  constructor(props, context) {
    super(props, context)
    this.props= {
      graph: {},
      identifier:uuid.v4(),
      style:{width:"640px",height:"480px"}
    }
    this.state = {
      hierarchicalLayout:true
    }
    this.changeModelet=this.changeModelet.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
  }


  render() {
    return React.createElement("div", {onDoubleClick: this.changeMode, id: this.props.identifier, style: this.props.style}, this.props.identifier);
  }

  changeModelet(event) {
    this.setState({hierarchicalLayout: !this.state.hierarchicalLayout});
    //this.updateGraph();
  }

  componentDidMount(){
    this.updateGraph();
  }

  componentDidUpdate(){
    this.updateGraph();
  }

  updateGraph(){
    // Container
    let container = document.getElementById(this.props.identifier);

    // Options
    let options = {
      stabilize: false,
      smoothCurves: false,
      edges: {
        color: '#000000',
        width: 0.5,
        arrowScaleFactor:0.5,
        style:"arrow"
      }

    };
    if (this.state.hierarchicalLayout) {
      options.hierarchicalLayout = {
        enabled: true,
        direction: "UD",
        levelSeparation:100,
        nodeSpacing:1
      };
    } else {
      options.hierarchicalLayout = {
        enabled: false
      };
    }

    let network = new vis.Network(container, this.props.graph, options);
  }

}

export default Graph;
