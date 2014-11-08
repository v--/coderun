function Console(element, onTilde) {

  self = this;

  this.element = element;
  this.onTilde = onTilde;
  this.logger = Logger.get('console'),
  this.logger.info('Initialized the console');

  this.input = document.createElement('input');
  this.compl = document.createElement('span');
  this.element.appendChild(this.input);
  this.element.appendChild(this.compl);
  this.logger.info('Created sub elements');

  this.input.addEventListener('change', this.onSubmit);
  this.input.addEventListener('keydown', this.onValueChange);
  this.input.addEventListener('cut', this.onValueChange);
  this.input.addEventListener('paste', this.onValueChange);

  this.logger.info('Added watchers');
}

Console.prototype = {
  value: '',

  blur: function() {
    this.input.blur();
  },

  focus: function() {
    this.input.focus();
  },

  reset: function() {
    this.input.value = '';
  },

  onSubmit: function(e) {
    self.logger.info('New command: ' + this.value);
    self.reset();

    if (self.onTilde)
      self.onTilde();

    self.blur();
  },

  onValueChange: function(e) {
    if (e.key === '`') {
      this.value = this.value.substr(0, this.value - 1);
      self.logger.info('Blurring');

      if (self.onTilde)
        self.onTilde();

      self.blur();
    }

    else
      self.logger.info('New value: ' + this.value);

    return true;
  }
}

module.exports = Console;
