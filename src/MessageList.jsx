/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render (){
    const newArray = this.props.currentMessageText.map((message) => {
    return <Message message={message.content} currentUser={message.currentUser} previousUser={message.previousUser}/> });
    return ( 
      <div className='messages'>
        {newArray}
      </div>
    )
    }
  }
