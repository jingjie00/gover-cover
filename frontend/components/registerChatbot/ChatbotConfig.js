import { createChatBotMessage } from "react-chatbot-kit";
import React from "react";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const config = {
  botName: "GovIncentiveBot",
  initialMessages: [createChatBotMessage(`Hello! How can I assist you today?`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  actionProvider: ActionProvider,
  messageParser: MessageParser,
};

export default config;