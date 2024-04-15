import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const API_URL = "https://chat-app-v9jf.onrender.com/api";

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <chatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        API_URL,
      }}>
      {children}
    </chatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(chatContext);
};

export default ChatProvider;
