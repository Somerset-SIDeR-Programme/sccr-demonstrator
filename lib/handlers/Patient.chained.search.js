const fs = require('fs');

function handler(options){
    return async (req, res)=>{

        let odsCode = req.params.odsCode;
        let resourceType = req.params.resourceType;
        let nhsNumber = req.query['patient.identifier'].split('|')[1];

        let path = `${options.static}/${odsCode}/${resourceType}/${nhsNumber}.json`;

        if (! fs.existsSync(path)){
            path = `${__dirname}/emptyBundle.json`;
        }

        res.sendFile(path);
    }
}

module.exports = handler;