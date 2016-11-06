export const message = {
  template: require('./message.html'),
  controller: 'MessageController',
  bindings: {
    avatar: '<',
    sender: '<',
    timestamp: '<',
    content: '<'
  }
};
