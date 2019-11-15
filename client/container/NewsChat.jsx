import React from "react";

import News from "./../components/News.jsx";
import Chat from "./../components/Chat.jsx";

const NewsChat = props => {
  return (
    <div>
      <News
        isPicked={props.isPicked}
        companySymbol={props.companySymbol}
        companyName={props.companyName}
        news={props.news}
        newsChangeHandler={props.newsChangeHandler}
      ></News>
      <Chat
        messages={props.messages}
        sendChatAction={props.sendChatAction}
        username={props.username}
      ></Chat>
    </div>
  );
};

export default NewsChat;
