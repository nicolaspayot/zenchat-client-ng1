import 'material-design-lite/material.js';
import 'material-design-lite/material.css';
import './index.css';

import angular from 'angular';

import {zenchat} from './app/zenchat.component';
import {znkHeader} from './app/header/znk-header.component';
import {messageList} from './app/message/message-list.component';
import {MessageListController} from './app/message/message-list.controller';
import {message} from './app/message/message.component';
import {znkFooter} from './app/footer/znk-footer.component';

angular.module('zenchat', [])
  .component('zenchat', zenchat)
  .component('znkHeader', znkHeader)
  .component('messageList', messageList)
  .controller('MessageListController', MessageListController)
  .component('message', message)
  .component('znkFooter', znkFooter);
