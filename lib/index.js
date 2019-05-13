const express = require('express');
const components = require('@blackpear/components-tech-arch-2017');

module.exports.start = function (config) {
    let app = express();

    components.app.addAwsMetadata(app);

    //Initialise logging
    //1. every request has req.reqId populated so that log events can be matched to the source request
    //2. app.locals.service.log, res.locals.service.log are provided so that events can be recorded for system
    //   monitoring and investigation. These logs are transient. Log level is configurable.
    //3. app.locals.service.audit, res.locals.service.audit are provided so that events can be recorded for future
    //   audit purposes. These logs are persistent.
    //4. every request is logged and audited
    app.use(components.middleware.addRequestId());
    app.use(components.middleware.addLogService(app, {name: config.service.name, level: config.logging.level}));
    app.use(components.middleware.addAuditService(app, {name: config.service.name}));
    app.use(components.middleware.logRequest(app));
    app.use(components.middleware.auditRequest(app));
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