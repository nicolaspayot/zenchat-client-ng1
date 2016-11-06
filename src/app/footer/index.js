import angular from 'angular';

import {znkFooter} from './znk-footer.component';
import {ZnkFooterController} from './znk-footer.controller';

export const zenchatFooter = 'zenchat.footer';

angular.module(zenchatFooter, [])
  .component('znkFooter', znkFooter)
  .controller('ZnkFooterController', ZnkFooterController);
