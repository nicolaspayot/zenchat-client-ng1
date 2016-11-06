import 'material-design-lite/material.js';
import 'material-design-lite/material.css';
import './index.css';

import angular from 'angular';

import {zenchat} from './app/zenchat.component';
import {znkHeader} from './app/header/znk-header.component';
import {znkFooter} from './app/footer/znk-footer.component';

import {zenchatMessage} from './app/message/';

angular.module('zenchat', [
  zenchatMessage
])
  .component('zenchat', zenchat)
  .component('znkHeader', znkHeader)
  .component('znkFooter', znkFooter);
