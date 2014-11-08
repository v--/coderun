function Console(element) {

  self = this;

  this.element = element;
  this.logger = Logger.get('console'),
  this.logger.info('Initialized the console');

  this.input = document.createElement('input');
  this.compl = document.createElement('span');
  this.element.appendChild(this.input);
  this.element.appendChild(this.compl);
  this.logger.info('Created sub elements');

  this.input.addEventListener('change', this.onSubmit);
  this.logger.info('Added watchers');
}

Console.prototype = {
  value: '',

  onSubmit: function() {
    self.logger.info('New command: ' + this.value);
  },

  onKeyDown: function() {
    self.logger.info('New command: ' + this.value);
  }
}

module.exports = Console;