/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render (){
    const newArray = this.props.currentMessageText.map((message) => {
    return <Message key={message.id} message={message.content} username={message.username}/> });
    return ( 
      <div className='messages'>
        {newArray}
      </div>
    )
    }
  }