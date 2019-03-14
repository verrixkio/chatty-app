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
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }
  //Our function for adding a new message!
  addMessage(content) {
    let newMessage = {
      currentUser: this.state.currentUser.name,
      content: content,
    };
    this.socket.send(JSON.stringify(newMessage)); 
  }
  changeName(username) {
    this.setState({currentUser: {name: username}}) 
  }
  componentDidMount() {
    console.log('componentDidMount <App />');
    
    this.socket.onmessage = (obj) => {
      var msg = JSON.parse(obj.data);
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
