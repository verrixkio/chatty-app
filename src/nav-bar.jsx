import React, {Component} from 'react';

export default class NavBar extends Component {
  render (){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <a className='onlineUser'>User's online: {this.props.counter}</a>
      </nav>
    );
  }
}