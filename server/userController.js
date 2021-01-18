const { mongo } = require('mongoose');
const models = require('./models'); //models.User //models.Conversation
const User = models.User;
const bcrypt = require('bcryptjs');

const userController = {};

userController.getUsers = (req, res, next) => {
  const currentUser = req.body.username;
  console.log(currentUser);
  const usernames = [];
  User.find({})
    .then( (mongoRes) => {
      console.log(mongoRes);
      if (!mongoRes.length) {
        res.locals.users = usernames;
        res.locals.status = 201;
        return next();
      }

      mongoRes.forEach((userObj) => {
        if (userObj.username !== currentUser) usernames.push(userObj.username);
      });
      res.locals.users = usernames;
      res.locals.status = 200;
      return next();
    });
};

userController.createUser = (req, res, next) => {
  //use email as username
  const {name, password, username} = req.body;
  console.log('name: ', name, 'username: ', username, 'password: ', password);
  //hashing password
  const hash = bcrypt.hashSync(password, 8);
  console.log('bcryptpassword: ', hash);
       
  User.create({name: name, password: hash, username: username})
    .then(() => {
      console.log('user created');
      res.locals.created = true;
      res.locals.username = username;
      res.locals.status = 200;
      next();
    })
    .catch(err => {
      res.locals.status = 203;
      res.locals.created = false;
      return next();
    }); 
}; 


userController.verifyUser = (req, res, next) => {
  const {username, password} = req.body;

  User.findOne({username})
    .then((mongoRes) => {
      if (mongoRes === null) {
        res.locals.verified = false;
        res.locals.status = 201;
      } else { //you've found a user based off the email
        if (bcrypt.compareSync(password, mongoRes._doc.password)){
          res.locals.verified = true; 
          res.locals.status = 200;
        } else {
          res.locals.verified = false;
          res.locals.status = 202;
        }
      }
      next();
    })
    .catch(err => {
      next({message: 'There was an error in the  - verifyUser - middlewear ', error: err});          
    }); 
};




module.exports = userController;



    





 
