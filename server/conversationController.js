const models = require('./models'); //models.User //models.Conversation
const Conversation = models.Conversation;
const mongoose = require('mongoose');

const ConversationController = {

  findConversation (req, res, next) {
   //here we will be getting an obejct with {sender: 'Matt', recipiant: 'Ross'}
  
   const {sender, recipient} = req.body;
   let result;

  //  const dummyMessages = [{"sender": sender, "recipient" : recipient, text: "hey matt, I got you some tacos", timestamp: "10:00PM"},
  //  {"sender": sender, "recipient" : recipient, text: "wow no way, thanks a lot", timestamp: "10:05PM"},
  //  {"sender": recipient, "recipient" : sender, text: "no problem matt", timestamp: "10:06PM"},
  //  {"sender": sender, "recipient" : recipient, text: "youre my bff<3", timestamp: "10:07PM"},
  //  {"sender": recipient, "recipient" : sender, text: "love you too", timestamp: "10:08PM"},]

   
   Conversation.find({participants : {name: sender} }) //returns an array with all convos matt has 
   .then(allConvosWithSender => {
    
    
     if (allConvosWithSender.length === 0){ //the sender has no convos with anyone
       Conversation.create({_id: mongoose.Types.ObjectId() , participants: [{name: sender}, {name: recipient}], messages: []})
       .then( (mongoResult) => {
         //should return us back an obj = {_id: 24vergverb, participants: [], messages: []}
         res.locals.convoId = mongoResult._id;
         res.locals.status = 200;
         res.locals.messages = mongoResult.messages;
         return next();
       })
     }

     for (let indivConvo = 0; indivConvo < allConvosWithSender.length; indivConvo ++){
       
       for (let convoParticipants = 0; convoParticipants < allConvosWithSender[indivConvo].participants.length; convoParticipants ++){
          let currentRecipient = allConvosWithSender[indivConvo].participants[convoParticipants].name 
          
          if (recipient === currentRecipient){
            result = allConvosWithSender[indivConvo];
            res.locals.convoId = result._id
            res.locals.messages = result.messages;
            res.locals.status = 200;
            return next();
          }
       }
     }

     /*if we make it here, we have iterated thru all of our senders convos, and have not found a conversation
     where the recipient is there. */
     
     Conversation.create({_id: mongoose.Types.ObjectId() ,participants: [{name: sender}, {name: recipient}], messages: []})
     .then( (mongoResult) => {
      res.locals.convoId = mongoResult._id
      res.locals.messages = mongoResult.messages;
      res.locals.status = 200;
      return next();
      })
    })
  },

  getAllConvosForAUser (req, res, next) {
    const { username } = req.body; 
    
    Conversation.find({participants: { name: username } })
    .then( (mongoResult) => {
      if (mongoResult.length === 0){
        res.locals.conversations = [];
        res.locals.status = 204;
        return next();
      } else {
        res.locals.conversations = mongoResult;
        res.locals.status = 200;
        return next();
      }
    })
  }

}






module.exports = ConversationController;