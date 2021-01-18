const express = require('express');
const app = express();
const path = require('path');

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

app.listen(PORT, () => {console.log(`listening on ${PORT} `);});

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


// module.exports = app;