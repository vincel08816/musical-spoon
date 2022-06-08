import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../../../contexts/userContext";

export default function useSocket(setPendingData) {
  const { userData } = useContext(UserContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socket = useRef();

  useEffect(() => {
    socket.current = io(`ws://${window.location.hostname}:3000`);
    socket.current.on("getMessage", (data) => setPendingData(data));
  }, [setPendingData]);

  useEffect(() => {
    socket.current.emit("addUser", userData._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [socket, userData._id]);

  return { onlineUsers, socket };
}
