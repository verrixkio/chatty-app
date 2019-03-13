/* eslint-disable react/prop-types */
import React, {Component} from 'react';
//Need to access currentuser



export default class ChatBar extends Component {
  constructor () {
    super()
    this.listenForEnter = this.listenForEnter.bind(this)
  }

  listenForEnter (evt) {
    if (evt.keyCode === 13) {
      this.props.addMessage(evt.target.value)
      evt.target.value = "";
    }
  }
  render (){
    return (
      <footer className="chatbar">
      
        <input className="chatbar-username" placeholder={this.props.currentUserText.name} />
        <input className="chatbar-message" onKeyUp={(this.listenForEnter)} name="newMessageBar" placeholder="Type a message and hit ENTER"/>
        
      </footer>
    );
  }
}