const dao = require('../../db/mongodb/dao')
const {createResponse} = require('../../utils/createResponse')


class Dashboard {

    async dashboard(req, res, error) {
        return createResponse(res, 200, "we got here")
    }
    
    
    // async signin(req, res, error){
        
    // }
}

module.exports = new Dashboard();