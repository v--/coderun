Logger.useDefaults();
// Logger.setLevel(Logger.OFF);
var mainLogger = Logger.get('main');

axios.get('/application.js').then(function (response) {
	mainLogger.info('Loaded application.js');
	var scriptText = response.data;
	eval(response.data);
}).catch(function (response) {
	var title;

	if (response instanceof Error) {
		title = 'The game crashed :(';
		mainLogger.error(response.message);
	}

	else
		title = 'Could not load the game :(';

	toastr.error(null, title);
});
