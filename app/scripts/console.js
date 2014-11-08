function Console(element, onEnter) {

  self = this;

  this.element = element;
  this.onEnter = onEnter;
  this.logger = Logger.get('console'),
  this.logger.info('Initialized the console');

  this.input = document.createElement('input');
  this.compl = document.createElement('span');
  this.element.appendChild(this.input);
  this.element.appendChild(this.compl);
  this.logger.info('Created sub elements');

  this.input.addEventListener('change', this.onSubmit);
  // this.input.addEventListener('keydown', this.tildeCheck);

  changeEvents = ['keydown', 'cut', 'paste'];

  for (i in changeEvents)
    this.input.addEventListener(changeEvents[i], this.onValueChange);

  this.logger.info('Added watchers');
}

Console.prototype = {
  value: '',

  blur: function() {
    this.reset();
    this.input.blur();

    if (self.onEnter)
      self.onEnter();
  },

  focus: function() {
    this.input.focus();
  },

  reset: function() {
    this.input.value = '';
  },

  onSubmit: function(e) {
    self.logger.info('New command: ' + this.value);
    self.blur();
  },

  tildeCheck: function(e) {
    if (e.key === '`');
      this.blur();
  },

  onValueChange: function(e) {
    self.logger.info('New value: ' + this.value);
  }
}

module.exports = Console;
