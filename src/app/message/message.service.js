import io from 'socket.io-client';
import {HOST_URL, API_URL} from '../constants';

export class MessageService {
  constructor($http) {
    'ngInject';

    this.$http = $http;
    this.messagesURL = `${API_URL}/messages`;
    this.socket = io(HOST_URL);

    this.$http.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getMessages() {
    return this.$http.get(this.messagesURL);
  }

  onNewMessagesEvent(callback) {
    this.socket.on('messages/new', () => callback());
  }

  send(message) {
    return this.$http.post(this.messagesURL, { message });
  }
}
