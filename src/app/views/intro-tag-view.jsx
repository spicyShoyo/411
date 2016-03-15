import React from 'react';

import { Paper } from 'material-ui/lib';
import { Card, CardMedia, CardText } from 'material-ui/lib/card';

export default class IntroTagView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { zDepth: 0 };
    this.currentInterval = null;
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseExit = this.mouseExit.bind(this);
  }

  mouseEnter(event) {
    event.preventDefault();
    if (this.currentInterval)
      window.clearInterval(this.currentInterval);
    this.currentInterval = window.setInterval(() => {
      if (this.state.zDepth >= 5) {
        window.clearInterval(this.currentInterval);
        return;
      }
      this.setState({ zDepth: ++this.state.zDepth });
    }, 30);
  }

  mouseExit(event) {
    event.preventDefault();
    if (this.currentInterval)
      window.clearInterval(this.currentInterval);
    this.currentInterval = window.setInterval(() => {
      if (this.state.zDepth <= 1) {
        window.clearInterval(this.currentInterval);
        return;
      }
      this.setState({ zDepth: --this.state.zDepth });
    }, 30);
  }

  render() {
    return (
      <Paper
        zDepth={this.state.zDepth}
        style={this.props.style}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseExit}>
        <Card>
          <CardMedia>
            <img src={this.props.imageSrc} />
          </CardMedia>
          <CardText>
            {this.props.children}
          </CardText>
        </Card>
      </Paper>
    );
  }
}
