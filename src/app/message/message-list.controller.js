export class MessageListController {
  constructor(MessageService) {
    'ngInject';

    this.MessageService = MessageService;
  }

  $onInit() {
    this.MessageService.getMessages().then(response => {
      this.messages = response.data;
    });
  }
}
