import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {displayMessage} from '../actions';
import './app.css';


export class _App extends React.Component {

  static propTypes = {
    message: React.PropTypes.string.isRequired,
    displayMessage: React.PropTypes.func.isRequired
  }
  static defaultProps = {
    message: ''
  }

  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  sayHello = () => {
    this.props.displayMessage(`World${'!'.repeat(this.state.count)}`);
    this.setState({count: this.state.count + 1 });
  }

  render = () => {
    return (
      <div className="container-fluid">
        <h1 className="display-1">Hello<small>{this.props.message}</small> </h1>
        <button type="button" className="btn btn-primary" onClick={this.sayHello}>Edit me!</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({message: state.message });
const mapDispatchToProps = dispatch => bindActionCreators({displayMessage},dispatch);
export const App = connect(mapStateToProps,mapDispatchToProps)(_App);