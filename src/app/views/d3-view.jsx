// import Graph from './graph-view'
import React from 'react';
import Graph from './graph-view';

const data = {
  nodes: [
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ],
  edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
};

class dd extends React.Component{

  render() {
    document.getElementById(this.props.identifier)
    return (
      <div>
      <p>sdc</p>
      <Graph graph={data} />
      </div>
    );
  }
}
export default dd;
