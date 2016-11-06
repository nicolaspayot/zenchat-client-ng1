export class MessageListController {
  'ngInject';

  constructor(MessageService) {
    this.MessageService = MessageService;
  }

  $onInit() {
    this.messages = this.MessageService.getMessages();
  }
}
