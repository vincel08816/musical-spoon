import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../../../contexts";

export default function useSocket() {
  const { userData } = useContext(UserContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  // {!} Need to do something with the pending data
  const [pendingData, setPendingData] = useState();

  // useEffect(() => {
  //   if (pendingData) {
  //     const newMessage = {
  //       sender: pendingData.senderId,
  //       text: pendingData.text,
  //       createdAt: Date.now(),
  //       _id: Date.now() + pendingData.senderId,
  //     };
  //     if (selectedConversation?.conversationId === pendingData.conversationId) {
  //       setMessages((prev) => [...prev, newMessage]);
  //     }
  //     if (chatMap.has(selectedConversation?.conversationId)) {
  //       const conversationToUpdate = chatMap.get(
  //         selectedConversation?.conversationId
  //       );
  //       chatMap.set(selectedConversation?.conversationId, {
  //         ...conversationToUpdate,
  //         lastMessage: newMessage,
  //       });
  //     }
  //     setPendingData();
  //   }
  // }, [pendingData, selectedConversation, chatMap]);

  useEffect(() => {
    socket.current = io(`ws://${window.location.hostname}:3000`);
    socket.current.on("getMessage", (data) => setPendingData(data));
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", userData._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [userData._id]);

  return { socket };
}
