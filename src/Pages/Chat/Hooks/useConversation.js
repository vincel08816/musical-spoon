import { useEffect, useState } from "react";
import useMap from "./useMap";

export default function useConversation(data) {
  const [messages, setMessages] = useState([]);
  const chatMap = useMap();

  // what do I do with the chat map?

  let { pendingData, setPendingData, selectedChatId, setSelectedChatId } = data;

  useEffect(() => {
    if (pendingData) {
      const newMessage = {
        sender: pendingData.senderId,
        text: pendingData.text,
        createdAt: Date.now(),
        _id: Date.now() + pendingData.senderId,
      };
      if (selectedChatId?.conversationId === pendingData.conversationId) {
        setMessages((prev) => [...prev, newMessage]);
      }
      if (chatMap.has(selectedChatId?.conversationId)) {
        const conversationToUpdate = chatMap.get(
          selectedChatId?.conversationId
        );
        chatMap.set(selectedChatId?.conversationId, {
          ...conversationToUpdate,
          lastMessage: newMessage,
        });
      }
      setPendingData();
    }
  }, [pendingData, setPendingData, selectedChatId, chatMap]);
  return { messages, setMessages };
}
