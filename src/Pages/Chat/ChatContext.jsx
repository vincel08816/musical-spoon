import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const ChatContext = createContext();

/*
  chats: type array
  currentChat: type string
  get chats to get chats
*/

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState({});
  const [currentChatId, setCurrentChatId] = useState();

  const getChats = () => {
    axios
      .get("/")
      .then((res) => setChats(res.data))
      .catch((err) => console.log(err));
  };

  const selectChat = (id) => setCurrentChatId(id);

  // useEffect(getChats, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        selectChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
