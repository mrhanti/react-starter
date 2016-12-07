import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {displayMessage} from '../actions/rootActions';


export class _App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { count: 0};
    this.sayHello = this.sayHello.bind(this);
  }


  sayHello() {
    this.props.displayMessage(`Hello${'!'.repeat(this.state.count)}`);
    this.setState({count: this.state.count + 1 });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="display-1">{this.props.message}</h1>
        <button type="button" className="btn btn-primary" onClick={this.sayHello}>Say Hello</button>
      </div>
    );
  }
}

_App.defaultProps = {
  message: ''
};

_App.propTypes = {
  message: React.PropTypes.string.isRequired,
  displayMessage: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({message: state.message });
const mapDispatchToProps = dispatch => bindActionCreators({displayMessage},dispatch);
export const App = connect(mapStateToProps,mapDispatchToProps)(_App);