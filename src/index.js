import angular from 'angular';

import {zenchat} from './app/zenchat.component';
import {znkHeader} from './app/header/znk-header.component';

import {zenchatMessage} from './app/message/';
import {zenchatFooter} from './app/footer';

angular.module('zenchat', [
  zenchatMessage,
  zenchatFooter
])
  .component('zenchat', zenchat)
  .component('znkHeader', znkHeader);
