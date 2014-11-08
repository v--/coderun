function Console(element) {
  this.logger = Logger.get('console');
  this.element = element;
  this.logger.info('Initialized the console');
}
