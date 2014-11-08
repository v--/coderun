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
  this.input.addEventListener('keyup', this.onValueChange);
  this.input.addEventListener('cut', this.onValueChange);
  this.input.addEventListener('paste', this.onValueChange);

  this.logger.info('Added watchers');
}

Console.prototype = {
  value: '',

  blur: function() {
    this.element.blur();
  },

  focus: function() {
    this.element.focus();
  },

  onSubmit: function() {
    self.logger.info('New command: ' + this.value);
  },

  onValueChange: function() {
    var isTilde = this.value.lastIndexOf('`') === this.value.length - 1;

    if (isTilde) {
      self.logger.info('Blurring');
      self.blur();

      if (self.onTilde)
        self.onTilde();
    }

    else
      self.logger.info('New value: ' + this.value);

    return !isTilde;
  }
}

module.exports = Console;
