const mongoose = require('mongoose');

//mongoose ---------

const MONGO_URI = 'mongodb+srv://hello-hush:bluetooth@cluster0.5t5s3.mongodb.net/mainDB?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'mainDB'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

const conversationSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    participants: [Object],
    messages: [Object],
})

// {name: 'ross'} {name: 'matt'}



const Conversation = mongoose.model('conversation', conversationSchema);
const User = mongoose.model('user', userSchema);


module.exports = {
    User,
    Conversation
}