/* eslint-disable no-console */
import React, {Component} from 'react';
import NavBar from './nav-bar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    
    //Bind the functions to allow usage.
    this.addMessage = this.addMessage.bind(this)
    this.changeName = this.changeName.bind(this)

    this.socket = new WebSocket('ws://localhost:3001')
    this.state = {
      usertotal: 0,
      type: '',
      previousUser: {name:'Anonymous'},
      currentUser: {name: ''},
      messages: []
    }
  }
  //Our function for adding a new message!
  addMessage(content) {
    //Add logic for if the current username and previous user name match to send a different notifcation.
    if (this.state.previousUser.name !== this.state.currentUser.name) {
      let newMessage = {
        previousUser: this.state.previousUser.name,
        type: 'incomingNotification',
        currentUser: this.state.currentUser.name,
        content: content
      };

      //Now we can set our previous username state to match our current state
      this.setState({previousUser: {name: this.state.currentUser.name}})
      this.socket.send(JSON.stringify(newMessage)); 
    } else {
      let newMessage = {
        type: 'postMessage',
        previousUser: this.state.currentUser.name,
        currentUser: this.state.currentUser.name,
        content: content
      };
      this.socket.send(JSON.stringify(newMessage)); 
    }
  }

  //Event handler for setting the username state.
  changeName(username) {
    //Set the current User
    this.setState({currentUser: {name: username}})
  }
  
  componentDidMount() {
    console.log('componentDidMount <App />');
    
    //Update user count in state
    this.socket.onmessage = (obj) => {
      var msg = JSON.parse(obj.data);
      console.log(msg, 'this is being sent!!')
      if (msg.type === 'userCounter') {
        this.setState({usertotal: msg.counter})
      } else {
      
      const oldMessages = this.state.messages;
      const newM = [...oldMessages, msg];
      this.setState({ messages: newM });  
      }
    }
 
    // Connection opened
    this.socket.onopen = function (event) {
      console.log('connected to server',event); 
    };
  }

  render() {
    return (
        <div>
        <NavBar counter={this.state.usertotal} />
        <MessageList currentMessageText={this.state.messages} />
        <ChatBar currentUserText={this.state.currentUser} addMessage={this.addMessage} changeName={this.changeName} />
        </div>
    );
  }
}
export default App;
