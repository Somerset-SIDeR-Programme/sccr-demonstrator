const express = require('express');

module.exports.start = function (config) {
    let app = express();

    app.use(function (req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        next()
    });

    app.get('/:odsCode/fhir/metadata', require('./handlers/metadata')(config));
    app.get('/:odsCode/fhir/Patient', require('./handlers/Patient.search')(config));
    app.get('/:odsCode/fhir/:resourceType', require('./handlers/Patient.chained.search')(config));

    //start the app
    server = app.listen(config.service.port);

    return app;
};