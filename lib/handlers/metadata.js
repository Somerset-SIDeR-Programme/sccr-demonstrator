function handler(options){
    return async (req, res)=>{
        let odsCode = req.params.odsCode;

        let path = `${options.static}/${odsCode}/metadata.json`;

        res.sendFile(path);
    }
}

module.exports = handler;