import axios from "axios";
import { createContext, useState } from "react";
import useConversation from "./Hooks/useConversation";
import useSocket from "./Hooks/useSocket";

/*
 **  chats: type array
 **  currentChat: type string
 **  get chats to get chats
 */

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChatId, setSelectedChatId] = useState();
  const [pendingData, setPendingData] = useState();

  let { onlineUsers, socket } = useSocket(setPendingData);
  let { messages, setMessages } = useConversation({
    pendingData,
    setPendingData,
    selectedChatId,
    setSelectedChatId,
  });

  const getChats = () => {
    axios
      .get("/")
      .then((res) => messages(res.data))
      .catch((err) => console.log(err));
  };

  const selectChat = (id) => setSelectedChatId(id);

  // useEffect(getChats, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        selectChat,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
