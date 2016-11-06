export class ZnkFooterController {
  constructor(MessageService) {
    'ngInject';

    this.MessageService = MessageService;
  }

  sendMessage() {
    this.MessageService.send(this.message);
  }
}
