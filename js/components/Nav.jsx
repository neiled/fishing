import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component{
  constructor(props) {
    super(props);
    this.state = {user: null};
  }
  // componentDidMount = (e) => {
  //   $.get("/user/current", function(result) {
  //       this.setState({user: result.user});
  //   });
  // }
  render() {
    var logged_in = this.state.user && Object.keys(this.state.user).length !== 0;
    var username = logged_in ? this.state.user : "Log in...";
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Bootstrap theme</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="/auth/twitter">Twitter Login</a></li>
              <li><a href="/auth/github">Github Login</a></li>
              <li><a href="#">{username}</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Nav);
