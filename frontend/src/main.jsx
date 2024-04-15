import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./context/ChatProvider.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ChatProvider>
      <React.StrictMode>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    </ChatProvider>
  </Router>
);
