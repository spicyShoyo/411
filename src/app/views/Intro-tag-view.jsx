import React from 'react';
import belle from 'belle';
let Card = belle.Card;

class IntroTagView extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return <section className="col-md-4">
      <Card style={{
        borderTop: '1px solid #f2f2f2',
        height: '20%'
      }}>
        <i className={this.props.icon}></i>

        <p>{this.props.text}</p>
      </Card>

    </section>
  };
}
export default IntroTagView;
