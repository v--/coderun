function Console(element) {

  self = this;

  this.messages = [],
  this.interpreter = [],
  this.element = element;
  this.logger = Logger.get('console'),
  this.logger.info('Initialized the console');

  this.input = document.createElement('input');
  this.compl = document.createElement('span');
  this.history = document.createElement('div');
  this.element.appendChild(this.input);
  this.element.appendChild(this.compl);
  this.element.appendChild(this.history);
  this.logger.info('Created sub elements');

  this.input.addEventListener('change', this.onSubmit);

  changeEvents = ['keydown', 'cut', 'paste'];

  for (i in changeEvents)
    this.input.addEventListener(changeEvents[i], this.onValueChange);

  this.logger.info('Added watchers');
}

Console.prototype = {
  value: '',

  reset: function() {
    this.input.value = '';
  },

  blur: function() {
    this.input.blur();
    this.reset();
  },

  focus: function() {
    this.input.focus();
  },

  populateMessages: function() {
    this.history.innerHTML = '';

    for (i in this.messages) {
      var message = document.createElement('div');
      message.innerHTML = this.messages[i];
      this.history.appendChild(message);
    }
  },

  onSubmit: function(e) {
    self.logger.info('New command: ' + this.value);
    self.messages = self.messages.slice(0, 4).reverse();
    self.messages.push(this.value);
    self.populateMessages();
  },

  onValueChange: function(e) {
    self.logger.debug('New value: ' + this.value);
  },
}

module.exports = Console;
