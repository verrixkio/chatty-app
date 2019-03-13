/* eslint-disable react/prop-types */
import React, {Component} from 'react';

export default class Message extends Component {
  render (){
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.message}</span>
        </div>
      </main>
    );
  }
}
