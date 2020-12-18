const dao = require('../../db/mongodb/dao')
const {createResponse} = require('../../utils/createResponse');
const { validateMongooseId, stringValidator } = require('../../utils/helpers/validator');

const userModel = "User";


class userManager {

    async get_all_users(req, res) {

        const users = await dao.queryMore(userModel, {})
        return createResponse(res, 200, "Users", users)

    }
    
    async get_a_user(req, res){

        if(!validateMongooseId(req.params.userId)) return createResponse(res, 400, "Invalid mongoose ID supplied")
        const gottenUser = await dao.findOneById(userModel, req.params.userId)

        if( gottenUser != null){

            return createResponse(res, 200, "Gotten User", gottenUser)

        }else{

            return createResponse(res, 400, "user ID with the supplied ID does not exist")

        }
    }

    async disable_a_user(req, res){

        if(req.method != "DELETE") return createResponse(res, 400, "invalid request type. Request type must be a delete")

        if(!validateMongooseId(req.params.userId)) return createResponse(res, 400, "invalid mongoose ID supplied")

        const disabledUser = await dao.updateOne(userModel, req.params.userId, {isActive: false})

        if (disabledUser != null){

            return createResponse(res, 200, "Disabled User", disabledUser)

        }else{

            return createResponse(res, 400, "An error occured while disabling the User")

        }
    }

    async upgrade_a_user(req, res){

        const {_id, userType} = req.body

        if(!validateMongooseId(_id)) return createResponse(res, 400, "Invalid mongoose ID supplied")

        if(!stringValidator(userType)) return createResponse(res, 400, "Provide a valid user type")

        if(userType != "admin" && userType != "user") return createResponse(res, 400, "Provide a valid user type (user or admin)")

        const upgradedUser = await dao.updateOne(userModel, _id, {userType})
        
        if( upgradedUser != null){

            return createResponse(res, 200, "User upgraded")

        }else{

            return createResponse(res, 400, "user ID with the supplied ID does not exist")

        }
    }
}

module.exports = new userManager();