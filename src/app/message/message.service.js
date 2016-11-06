import {API_URL} from '../constants';

export class MessageService {
  constructor($http) {
    'ngInject';

    this.$http = $http;
  }

  getMessages() {
    return this.$http.get(`${API_URL}/messages`);
  }
}
