const express = require('express');
const app = express();
const path = require('path');
const models = require('./models');



const userRouter = require('./userRouter');
const conversationRouter = require('./conversationRouter');

const PORT = 3000;



//express ---------
// app.use('/build', express.static(path.join(__dirname, '../build')));
app.use(express.json());

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

const socketIdPhoneBook = {};
const Conversation = models.Conversation;



socket.on('connection', (uniqueClientConnect) => {
  //---------------listeners---------------
  socket.on('defineClient', (clientInfo) => {
    const client  = JSON.parse(clientInfo);
    const email = client.email;
    socketIdPhoneBook[email] = uniqueClientConnect.id;
  });



  /*message shape from client = {
    CID: GHE*&VE%CVJEV
    sender: 'matt@gmail.com',
    recipient: 'ross@aol.com',
    text: "Yo man how are you?"
  }

  */
         /*
        messageObject = {
          sender:
          recipient:
          body: 
          timestamp: 
        }
        */
  socket.on('directMessage', (messageObj) => {
    const { CID, sender, recipient, text,  timestamp } = messageObj; //from client -> server
    let recipientSocketId = socketIdPhoneBook[recipient]; //socket it for recipient

    const newMessage = {
      sender,
      recipient,
      text,
      timestamp
    };
    //doing findOneAndUpdate twice because we may need to add different features. we will see...
    if (!recipientSocketId){ //just add to the database there is no live recipient
      Conversation.findOneAndUpdate({_id: CID}, { $push: {messages: newMessage}}, {new: true})
      .then((conversation) => {
        console.log(conversation);
      })
    } else {//there is a live socket to route to
      Conversation.findOneAndUpdate({_id: CID}, { $push: {messages: newMessage}}, {new: true})
      .then( () => {
        uniqueClientConnect.to(recipientID).emit('private', newMessage);
      })
    }
  })


  

  
})



