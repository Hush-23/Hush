

let clientSocket;

const connectToSocket = () => {
    console.log('connecting to socket')
    clientSocket = io.connect('http://localhost:3000') 
}
//connects to the socket 'portion' of our server
//invoke when sign in 

//const username = this.state.username this is an example.
const username // ^

clientSocket.on('outGoingDM', (incomingMessage) => {
    console.log('received a message');
    let incomingMessageObj = JSON.parse(incomingMessage);
    //up to front end how they want to render that message ...
    let {CID, sender, recipient, text, timestamp} = incomingMessageObj;
    console.log(text)
})


/* EMITER FUNCTIONS BELOW */ 

const sendDM = (cid, sender, recipient, text) => {
    console.log('sending a dm');
    let directMessage = {};
    //building the message below
    directMessage[cid] = cid
    directMessage[sender] = sender
    directMessage[recipient] = recipient
    directMessage[text] = text
    directMessage[timestamp] = 'will be done on server'
    clientSocket.emit( 'directMessage', JSON.stringify(directMessage));
} 


const defineMe = (username) => { //pass in this.state.username
    console.log('sending my name to server');
    clientSocket.emit( 'defineClient' , `{"username":"${username}" }`);
}

const disconnectFromSocket = (username) => { //pass in this.state.username
    console.log('disconnecting  From  Socket');
    clientSocket.emit( 'disconnect' , `${username}`);
    clientSocket.disconnect();
}