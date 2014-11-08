var logger = new Logger();
var binding = {};
logger.enabled = true;

axios.get('/application.js').then(function (response) {
	var scriptText = response.data;
	eval(response.data);
}).catch(function (response) {
	var title;

	if (response instanceof Error) {
		title = 'The game crashed :(';
		logger.error(response.message);
	}

	else
		title = 'Could not load the game :(';

	toastr.error(null, title);
});
