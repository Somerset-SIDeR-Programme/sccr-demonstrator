const fs = require('fs');

function handler(options){
    return async (req, res)=>{

        let odsCode = req.params.odsCode;
        let nhsNumber = req.query.identifier.split('|')[1];

        let path = `${options.static}/${odsCode}/Patient/${nhsNumber}.json`;

        if (! fs.existsSync(path)){
            path = `${__dirname}/emptyBundle.json`;
        }

        res.sendFile(path);
    }
}

module.exports = handler;