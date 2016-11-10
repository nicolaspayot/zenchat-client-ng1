import {HOST_URL} from '../constants';

export class MessageController {
  $onInit() {
    this.avatarUrl = `${HOST_URL}/${this.data.sender.avatar}`;
  }
}
