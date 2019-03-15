/* eslint-disable no-console */
import React, {Component} from 'react';
import NavBar from './nav-bar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.addMessage = this.addMessage.bind(this)
    this.changeName = this.changeName.bind(this)
    
    this.socket = new WebSocket('ws://localhost:3001')
    this.state = {
      type: '',
      previousUser: {name:'Anonymous'},
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }
  //Our function for adding a new message!
  addMessage(content) {
    console.log(this.state.previousUser.name, 'this is our previous user')
    console.log(this.state.currentUser.name, 'this is our current user')
    if (this.state.previousUser.name !== this.state.currentUser.name) {
      let newMessage = {
        previousUser: this.state.previousUser.name,
        type: 'incomingNotification',
        currentUser: this.state.currentUser.name,
        content: content
      };
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


  changeName(username) {
    //Set the current User
    this.setState({currentUser: {name: username}})
  }
  componentDidMount() {
    console.log('componentDidMount <App />');
    this.socket.onmessage = (obj) => {
      var msg = JSON.parse(obj.data);
      console.log(msg, 'this is the mes obj.data')

      
      const oldMessages = this.state.messages;
      const newM = [...oldMessages, msg];
      this.setState({ messages: newM });  
    }
 
    // Connection opened
    this.socket.onopen = function (event) {
      console.log('connected to server',event); 
    };
  }

  render() {
    return (
        <div>
        <NavBar />
        <MessageList currentMessageText={this.state.messages} />
        <ChatBar currentUserText={this.state.currentUser} addMessage={this.addMessage} changeName={this.changeName} />
        </div>
    );
  }
}
export default App;
