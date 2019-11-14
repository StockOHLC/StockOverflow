import React, { useEffect } from "react";

import HomePage from "./container/HomePage";

// //socket-client connection
// const io = require('socket.io-client');
// const socket = io('ws://localhost:3000', {transports: ['websocket']});

const App = props => {
  // useEffect(() => {
  //   //socket
  //   socket.on('message', msg => {
  //     //display the messages
  //     console.log('we got a message', msg)
  //   });
  // }, []);

  return (
    <div>
      <HomePage></HomePage>
    </div>
  );
};

export default App;
