export class MessageListController {
  constructor(MessageService, $element, $timeout) {
    'ngInject';

    this.MessageService = MessageService;
    this.$element = $element;
    this.$timeout = $timeout;
  }

  $onInit() {
    this.getMessages();

    this.MessageService.onNewMessagesEvent(() => this.getMessages());
  }

  getMessages() {
    this.MessageService.getMessages().then(response => {
      this.messages = response.data;
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    const parent = this.$element.parent()[0];
    this.$timeout().then(() => {
      parent.scrollTop = parent.scrollHeight;
    });
  }
}
