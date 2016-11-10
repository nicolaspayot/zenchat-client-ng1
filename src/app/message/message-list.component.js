export const messageList = {
  template: `
    <message
      ng-repeat="msg in $ctrl.messages"
      data="msg">
    </message>
  `,
  controller: 'MessageListController'
};
