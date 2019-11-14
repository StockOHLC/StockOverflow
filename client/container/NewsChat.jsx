import React from "react";

import News from "./../components/News.jsx";
import Chat from "./../components/Chat.jsx";

const NewsChat = props => {
  return (
    <div className="news-chat-div">
      <News></News>
      <br className="news-chat-div-break"></br>
      <Chat></Chat>
    </div>
  );
};

export default NewsChat;
