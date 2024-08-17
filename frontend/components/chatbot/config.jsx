import { createChatBotMessage } from "react-chatbot-kit";
import PaymentButton from "./PaymentButton";

const config = {
  botName: "HealthMe",
  initialMessages: [
    createChatBotMessage(`Good morning, Jason`),
    createChatBotMessage(`How much would you like to contribute as a donation?`),
  ],
  widgets: [
    {
      widgetName: "paymentButton",
      widgetFunc: (props) => <PaymentButton {...props} />,
    },
  ],
  // customStyles:{
  //   botMessageBox:{
  //     backgroundColor: "#376B7E",
  //   },
  //   chatButton:{
  //     backgroundColor: "#376B7E",
  //   },
  // }
};

export default config;
