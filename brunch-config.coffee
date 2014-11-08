exports.config =
	sourceMaps: false
	optimize: true

	paths:
		watched: ['app', 'boot']

	files:
		javascripts:
			joinTo:
				'application.js': /^app/
				'boot.js': /^(boot|bower_components)/

			order:
				after: [
					'app/scripts/index.js'
				]

		stylesheets:
			joinTo: 'application.css'

	plugins:
		autoReload:
			enabled: true
			port: 9485
			delay: 200

	modules:
		definition: false
		wrapper: false
