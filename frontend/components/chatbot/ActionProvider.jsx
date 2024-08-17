import React from "react";
import PaymentButton from "./PaymentButton";

class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }

  handleMoney() {
    const messages = [
      'By default, your sum of money will be distributed to patients who match the criteria below:',
      '- Disability: Not specified',
      '- Age: All',
      '- Family Members: All',
      'Would you like to change the criteria of patients to donate to?'
    ];
  
    const delays = [0, ,500 ,1000, 2000, 3000]; // Hardcoded delays for each message
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  }
  
  
  
  

  handleChangeCriteria() {
    const message = this.createChatBotMessage('Would you like to change the criteria of patients to donate to?');
    this.updateChatbotState(message);
  }


  
  handleOrphanedChildrenWithBlindness() {
    const messages = [
      'Your list has been updated as shown on the right panel.',
      'If you need any changes, please feel free to let me know',
    ];
  
    const delays = [500, 1200]; // Hardcoded delays for each message
  
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.updateChatbotState(this.createChatBotMessage(message));
      }, delays[index]);
    });
  
    const totalDelay = delays.reduce((a, b) => a + b, 0); // Sum of all delays
    setTimeout(() => {
      this.updateChatbotState(
        this.createChatBotMessage(
          "Once confirmed, you may proceed with the payment",
          {
            widget: "paymentButton",
          }
        )
      );
    }, totalDelay + 500); // Adding an additional delay to ensure it runs after the previous messages
  }
  


  handleLast() {
    this.updateChatbotState(this.createChatBotMessage(`Processing completed`));
  }

  handleProceedToPayment = () => {
    this.updateChatbotState(this.createChatBotMessage(`Proceeding to payment...`));
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
