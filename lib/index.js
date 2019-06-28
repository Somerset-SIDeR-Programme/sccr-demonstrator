const express = require('express');

module.exports.start = function (config) {
    let app = express();

    app.use(function (req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        next()
    });

    app.get('/', require('./handlers/root')(config));
    app.get('/:odsCode/fhir/metadata', require('./handlers/metadata')(config));
    app.get('/:odsCode/fhir/Patient', require('./handlers/Patient.search')(config));
    app.get('/:odsCode/fhir/:resourceType', require('./handlers/Patient.chained.search')(config));

    //start the app
    const port = normalizePort(process.env.PORT || config.service.port || '3000');
    server = app.listen(port);


    function normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    return app;
};