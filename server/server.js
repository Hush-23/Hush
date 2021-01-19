const express = require('express');
const app = express();
const path = require('path');
const models = require('./models');
const cors = require('cors');
const CryptoJS = require("crypto-js");


const userRouter = require('./userRouter');
const conversationRouter = require('./conversationRouter');
const PORT = 3000;

//express ---------
app.use('/build', express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(cors())

app.get('/dashboard', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/login', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

const server = app.listen(PORT, () => {console.log(`listening on ${PORT} `);});

//User router ---------
app.use('/user', userRouter);

//Conversation router ---------
app.use('/chat', conversationRouter);

/**
 * Global error handler
 **/
app.use((err, req, res, next) => {
  const defaultError = {
    message: 'Undefinded/Uncaught Error in server',
    error: 'No Error Caught'
  };

  const customError = Object.assign({}, defaultError, err);

  console.log(customError);

  res.status(400).send('Internal Server Default Error');
});


/*

Below is the socket logic.

*/

const socket = require('socket.io')(server)  //this binds socket to the express server we created above


/*
socket.on('connection') listens for a connection. each connection event happens with a unique client.
by default our client will emit a "defineClient" event that will carry with it an email.
*/
//operator 

const socketIdPhoneBook = {};
const Conversation = models.Conversation;

socket.on('connection', (uniqueClientConnect) => {
  console.log('new user connected')
  uniqueClientConnect.on('connected', (data)=>{
    console.log(data);
  })
  
  //---------------listeners---------------
  uniqueClientConnect.on('defineClient', (clientInfo) => {
    
    const client  = JSON.parse(clientInfo);
    const username = client.username;
    socketIdPhoneBook[username] = uniqueClientConnect.id;
    
  });

  // listen for directMessages
  uniqueClientConnect.on('directMessage', (dirtyMessageObj) => {
    console.log('inside DIRTY server message obj = ', dirtyMessageObj)
    let messageObj = JSON.parse(dirtyMessageObj);
    
    const { cid, sender, recipient, text, timestamp} = messageObj; //from client -> server
    let recipientSocketId = socketIdPhoneBook[recipient]; //socket it for recipient

    const secret = 'tacos'
    let ciphertext = CryptoJS.AES.encrypt(text, secret).toString();
    
    const newMessage = {
      sender,
      recipient,
      'text' : ciphertext,
      timestamp
    };
    console.log(newMessage)

    //doing findOneAndUpdate twice because we may need to add different features. we will see...
    if (!recipientSocketId){ //just add to the database there is no live recipient
      Conversation.findOneAndUpdate({_id: cid}, { $push: {messages: newMessage}}, {new: true})
      .then((conversation) => {
        console.log(conversation);
      })
    } else {//there is a live socket to route to
      Conversation.findOneAndUpdate({_id: cid}, { $push: {messages: newMessage}}, {new: true})
      .then( () => {
        uniqueClientConnect.to(recipientSocketId).emit('outGoingDM', JSON.stringify(newMessage));
      })
    }
  })

  uniqueClientConnect.on('plzDisconnect', (username) => {
    delete socketIdPhoneBook[username];
    //uniqueClientConnect.disconnect(true) MAYBE socket.disconnect(true);
  })

})



