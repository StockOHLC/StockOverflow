import React from "react";

import News from "./../components/News.jsx";
import Chat from "./../components/Chat.jsx";

const NewsChat = props => {
  return (
    <div>
      <News></News>
      <Chat
        messages={props.messages}
        sendChatAction={props.sendChatAction}
        username={props.username}
      ></Chat>
    </div>
  );
};

export default NewsChat;
