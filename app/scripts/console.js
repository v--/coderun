function Console(element) {

  self = this;
  this.messages = [],
  this.interpreters = {},
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
      var wrapper = document.createElement('div');
      var message = document.createElement('span');
      var result = document.createElement('span');
      wrapper.appendChild(message);
      wrapper.appendChild(result);
      message.innerHTML = this.messages[i].text;
      result.innerHTML = this.messages[i].result;
      result.className = this.messages[i].isValid ? 'green' : 'red';
      this.history.appendChild(wrapper);
    }
  },

  interpret: function(value) {
    var splitted, command;

    if (typeof value !== 'string' && !(value instanceof String))
      throw new Error('Cannot interpret a non-string');

    if (value.isEmpty())
      throw new Error('Cannot interpret an empty string');

    splitted = value.split(' ');
    command = splitted[0];

    if (!this.interpreters[command])
      throw new Error('No such command');

    return this.interpreters[command].apply(this, splitted.slice(1));
  },

  onSubmit: function(e) {
    var result = {
      text:this.value
    };

    try {
      self.interpret(result.text)
      result.result = 'Success!';
      result.isValid = true;
    }

    catch (e) {
      result.result = e.message;
      result.isValid = false;
    }

    self.logger.info('New command: ' + this.value);
    self.messages = self.messages.slice(0, 4).reverse();
    self.messages.push(result);
    self.populateMessages();
  },

  onValueChange: function(e) {
    self.logger.debug('New value: ' + this.value);
  },
}

module.exports = Console;
