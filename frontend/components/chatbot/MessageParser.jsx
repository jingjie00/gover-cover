class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    if (lowercase.includes("change") || lowercase.includes("criteria")) {
      this.actionProvider.handleChangeCriteria();
    } else if (lowercase.includes("children with blindness")) {
      this.actionProvider.handleOrphanedChildrenWithBlindness();
    } else if (lowercase.includes("50000")){
      this.actionProvider.handleMoney();
    }else if (lowercase.includes("ok") || lowercase.includes("proceed"))
      this.actionProvider.handleLast();
  }
}

export default MessageParser;