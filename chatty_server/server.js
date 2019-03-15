// server.js
const uuid = require('uuid')
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const userConnected = {
    counter: wss.clients.size,
    type: 'userCounter'
  }
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(userConnected))
  });
  

  ws.on('message', function (data) {
    
    console.log(data);
    var msg = JSON.parse(data);
    msg.id = uuid()
    switch(msg.type) {
    //Non Normal Message
      case 'incomingNotification':
        wss.clients.forEach(function each(client) {
        console.log('testing')  
        client.send(JSON.stringify(msg));
      })
      break;
      //Normal Message Post
    case 'postMessage':
    wss.clients.forEach(function each(client) {
      console.log('testing')  
      client.send(JSON.stringify(msg));
      })
      break;
  }
});



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    const userConnected = {
      counter: wss.clients.size,
      type: 'userCounter'
    }
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(userConnected))
    });
  });
   
})