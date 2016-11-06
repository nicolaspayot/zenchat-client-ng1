export class MessageListController {
  constructor(MessageService) {
    'ngInject';

    this.MessageService = MessageService;
  }

  $onInit() {
    this.messages = this.MessageService.getMessages();
  }
}
