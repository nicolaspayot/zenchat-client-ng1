import angular from 'angular';

import {messageList} from './message-list.component';
import {MessageListController} from './message-list.controller';
import {message} from './message.component';
import {MessageService} from './message.service';

export const zenchatMessage = 'zenchat.message';

angular.module(zenchatMessage, [])
  .component('messageList', messageList)
  .controller('MessageListController', MessageListController)
  .component('message', message)
  .service('MessageService', MessageService);
