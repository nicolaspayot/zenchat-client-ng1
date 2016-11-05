import {MESSAGES} from './messages';

export class MessageListController {
  $onInit() {
    this.messages = MESSAGES;
  }
}
