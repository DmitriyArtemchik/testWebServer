'use strict'

const http = require('http'),
	    // https = require('https'),
	    express = require('express'),
	    // formidable = require('formidable'),
			helmet = require('helmet'),
	    fs = require('fs'),
	    vhost = require('vhost'),
      app = express();


// disabling the header
app.use(helmet.hidePoweredBy());
app.disable('x-powered-by');

// Sets "X-XSS-Protection: 0"
app.use(helmet.xssFilter());


// set up handlebars view engine
const handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: (name, options)=> {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// use domains for better error handling
app.use(function(req, res, next){
    // create a domain for this request
    const domain = require('domain').create();
    // handle errors on this domain
    domain.on('error', function(err){
        console.error('DOMAIN ERROR CAUGHT\n', err.stack);
        try {
            // failsafe shutdown in 5 seconds
            setTimeout(function(){
                console.error('Failsafe shutdown.');
                process.exit(1);
            }, 5000);

            // disconnect from the cluster
            const worker = require('cluster').worker;
            if(worker) worker.disconnect();

            // stop taking new requests
            server.close();

            try {
                // attempt to use Express error route
                next(err);
            } catch(error){
                // if Express error route failed, try
                // plain Node response
                console.error('Express error mechanism failed.\n', error.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('Server error.');
            }
        } catch(error){
            console.error('Unable to send 500 response.\n', error.stack);
        }
    });

    // add the request and response objects to the domain
    domain.add(req);
    domain.add(res);

    // execute the rest of the request chain in the domain
    domain.run(next);
});

// logging
switch(app.get('env')){
    case 'development':
    	// compact, colorful dev logging
    	app.use(require('morgan')('dev'));
      break;
    case 'production':
      // module 'express-logger' supports daily log rotation
      app.use(require('express-logger')({ path: __dirname + '/log/requests.log'}));
    break;
}

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
	res.render('home');
});

app.get('/about-us', (req, res)=> {
	res.render('about-us');
});

app.get('/contacts', (req, res)=> {
	res.render('contacts');
});

app.get('/portfolio', (req, res)=> {
	res.render('portfolio');
});

app.get('/services', (req, res)=> {
	res.render('services');
});

// 404 catch-all handler (middleware)
app.use((req, res, next)=> {
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use((err, req, res, next)=> {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


let server;

function startServer() {
    server = http.createServer(app).listen(app.get('port'), ()=> {
      console.log( 'Express started in ' + app.get('env') +
        ' mode on http://localhost:' + app.get('port') +
        '; press Ctrl-C to terminate.' );
    });
}

if(require.main === module){
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function to create server
    module.exports = startServer;
}
