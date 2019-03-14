/* eslint-disable react/prop-types */
import React, {Component} from 'react';
//Need to access currentuser



export default class ChatBar extends Component {
  constructor () {
    super()
    this.listenForEnter = this.listenForEnter.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  listenForEnter (evt) {
    if (evt.keyCode === 13) {
      
      this.props.addMessage(evt.target.value)
      evt.target.value = '';
    }
  } 
  handleChange(event) {
      let username = event.target.value;
      this.props.changeName(username)
    
  }



  
  render (){
    return (
      <footer className="chatbar">
        <input className="chatbar-username"value={this.props.currentUserText.name} onChange={(this.handleChange)} placeholder='Enter your name.' />
        <input className="chatbar-message" onKeyUp={(this.listenForEnter)} name="newMessageBar" placeholder="Type a message and hit ENTER"/>
      </footer>
    );
  }
}