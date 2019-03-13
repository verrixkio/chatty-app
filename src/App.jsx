/* eslint-disable no-console */
import React, {Component} from 'react';
import NavBar from './nav-bar.jsx'
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.addMessage = this.addMessage.bind(this)
    this.state = { socket: new WebSocket('ws://localhost:3001'),
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }
  //Our function for adding a new message!
  addMessage(content) {
    let newMessage = {
      id: Math.floor(Math.random() * 100000),
      username: this.state.currentUser.name,
      content: content,
  
    };
    this.state.socket.send(JSON.stringify(newMessage));
    const oldMessages = this.state.messages;
    const newM = [...oldMessages, newMessage];
    this.setState({ messages: newM });
    
  }
  componentDidMount() {
    console.log('componentDidMount <App />');
    
    // Connect our code to the websocket server.
    // Connection opened
    console.log(this.state.socket)
    // Connection opened
    this.state.socket.onopen = function (event) {
      console.log('connected to server',event); 
    };
  
    // socket.onopen = function (event) {
    //   socket.send("Here's some text that the server is urgently awaiting!"); 
    // };

    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
        <div>
        <NavBar />
        <MessageList currentMessageText={this.state.messages} />
        <ChatBar currentUserText={this.state.currentUser} addMessage={this.addMessage} />
        </div>
    );
  }
}
export default App;
