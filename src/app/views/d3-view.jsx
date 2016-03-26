// import Graph from './graph-view'
import React from 'react';
import Graph from './graph-view';

const styles = {
  graph: {
    width: '960px',
    height: '480px',
  },
  info: {
    widht: '320px',
    height: '480px',
  },
};

const data = {
  nodes: [
      {id: 1, label: 'Node 1', title: 'I have a popup!'},
      {id: 2, label: 'Node 2', title: 'I have a popup!'},
      {id: 3, label: 'Node 3', title: 'I have a popup!'},
      {id: 4, label: 'Node 4', title: 'I have a popup!'},
      {id: 5, label: 'Node 5', title: 'I have a popup!'}
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
      <Graph graph={data} style={styles.graph} />
      </div>
    );
  }
}
export default dd;
