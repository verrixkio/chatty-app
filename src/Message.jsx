/* eslint-disable react/prop-types */
import React, {Component} from 'react';

export default class Message extends Component {
  render (){
    if (this.props.previousUser !== this.props.currentUser) {
    return (
      <main className="messages">
        <div className="notification">
          <span className="notification-content">{this.props.previousUser} changed their name to {this.props.currentUser}.</span>
        </div>
        <div className="message">
          <span className="message-username">{this.props.currentUser}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
        
      </main>
    );
  } else {
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">{this.props.currentUser}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
        </main>
      );
    }
  }
}

