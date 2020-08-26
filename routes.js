// const main = require('./handlers/main.js');

module.exports = function(app) {

	// miscellaneous routes
	app.get('/', main.home);
	app.get('/about-us', main.about-us);
	app.get('/contacts', main.contacts);
	app.get('/portfolio', main.portfolio);
	app.get('/services', main.services);
};
