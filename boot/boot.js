Logger.useDefaults();
// Logger.setLevel(Logger.OFF);
var mainLogger = Logger.get('main');

axios.get('/application.js').then(function (response) {
  var background = document.getElementById('background');
  background.innerHTML = response.data;
  var require = globalRequire;
  delete globalRequire;
  mainLogger.info('Loaded application.js');
  eval(response.data);
  require('index');
}).catch(function (response) {
  var title;
  toastr.error(response);

  if (response instanceof Error) {
    title = 'The game crashed :(';
    mainLogger.error(response.message);
  }

  else
    title = 'Could not load the game :(';

  toastr.error(title);
});
