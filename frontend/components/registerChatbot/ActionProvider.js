class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }
  
    handleDefault = () => {
      const message = this.createChatBotMessage("I'm here to help! What would you like to know?");
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  }
  
  export default ActionProvider;