const dao = require('../../db/mongodb/dao');
const { create } = require('../../db/mongodb/mongoose_models/User');
const {createResponse} = require('../../utils/createResponse');
const { stringValidator, numberValidator, validateMongooseId } = require('../../utils/helpers/validator');

const mailPlanModel = "MailPlan"

class MailPlan {

    async create_mail_plan(req, res) {
        const {planName, features, numberOfMailsPerMonth, durationInMonths,price,oldPrice,description} = req.body;
        
        if(!stringValidator(planName)) return createResponse(res,400,"please provide a valid plan name");

        if(!stringValidator(features)) return createResponse(res,400,"please provide valid features");

        if(!stringValidator(description)) return createResponse(res,400,"please provide valid description for the plan");

        if(!numberValidator(price)) return createResponse(res,400,"please provide a price");

        if(!numberValidator(durationInMonths)) return createResponse(res,400,"please provide a valid duration in months");

        if(!numberValidator(oldPrice)) return createResponse(res,400,"please provide a valid value for old price");

        if(!numberValidator(numberOfMailsPerMonth)) return createResponse(res,400,"please provide a valid number of mails per month");

        const planNameFromDb = await dao.findOne(mailPlanModel, {planName})
        if(planNameFromDb == null){

            const savedMailPlan = await dao.create(mailPlanModel, 
            {planName, features, numberOfMailsPerMonth, durationInMonths, price, oldPrice, description });

            if(savedMailPlan._id != null){

                return createResponse(res, 200, "Saved mail plan", savedMailPlan);

            }else{

                return createResponse(res,400,"An error occured creating the mail plan");

            }
        }else{

            return createResponse(res,400,"plan name already exists");

        }

    }

    async get_all_mail_plans(req, res) {
        const mailPlans = await dao.queryMore(mailPlanModel, {})
        return createResponse(res, 200, "Mail Plans", mailPlans)
    }

    async get_a_mail_plan(req, res){

        if(!validateMongooseId(req.params.mailPlanId)) return createResponse(res, 400, "Invalid mongoose ID supplied")

        const mailPlan = await dao.findOneById(mailPlanModel, req.params.mailPlanId);

        if( mailPlan != null){
            return createResponse(res, 200, "Mail Plan", mailPlan)
        }else{
            return createResponse(res, 400, "plan with the supplied ID does not exist")
        }
    }

    async update_mail_plan(req, res){
        let mailUpdateData = {}    

		for(let prop in req.body) {
			if(req.body[prop]) {
				mailUpdateData[prop] = req.body[prop]
			}
        }

        if("_id" in mailUpdateData) {

            if(!validateMongooseId(mailUpdateData["_id"])) return createResponse(res, 400, "Invalid mongoose ID supplied")

        }else{

            return createResponse(res, 400, "Please provide an ID");
        }

		if("planName" in mailUpdateData){

            if(!stringValidator(mailUpdateData["planName"])) return createResponse(res,400,"please provide a valid plan name");

            const planNameFromDb = await dao.findOne(mailPlanModel, {planName: mailUpdateData["planName"]})
            if( planNameFromDb != null) return createResponse(res, 400, "Plan name already exists. Consider removing the plan name from the payload sent")

        }
        
        if("numberOfMailsPerMonth" in mailUpdateData){
            if(!numberValidator(mailUpdateData["numberOfMailsPerMonth"])) return createResponse(res,400, "please provide a valid number of mails per month")
        }

        if("price" in mailUpdateData){
            if(!numberValidator(mailUpdateData["price"])) return createResponse(res,400, "please provide a valid price value")
        }

        if("oldPrice" in mailUpdateData){
            if(!numberValidator(mailUpdateData["oldPrice"])) return createResponse(res,400, "please provide a valid old Price value")
        }

        if("durationInMonths" in mailUpdateData){
            if(!numberValidator(mailUpdateData["durationInMonths"])) return createResponse(res,400, "please provide a valid value for duration in months")
        }

        if("features" in mailUpdateData){
            if(!stringValidator(mailUpdateData["features"])) return createResponse(res,400,"please provide valid features");
        }

        if("description" in mailUpdateData){
            if(!stringValidator(mailUpdateData["description"])) return createResponse(res,400,"please provide valid features");
        }

        const updateMailPlan = await dao.updateQuery(mailPlanModel, mailUpdateData["_id"], mailUpdateData)
        if(updateMailPlan != null) {
            return createResponse(res, 200, "Mail Plan Updated")
        }else{
            return createResponse(res,400,"An erro occured updating the mail plan");
        }
    }

    async disable_mail_plan(req, res){
        if(req.method != "DELETE") return createResponse(res, 400, "invalid request type. Request type must be a delete")

        if(!validateMongooseId(req.params.mailPlanId)) return createResponse(res, 400, "invalid mongoose ID supplied")

        const disabledMailPlan = await dao.updateOne(mailPlanModel, req.params.mailPlanId, {isActive: false})

        if (disabledMailPlan != null){
            return createResponse(res, 200, "Disabled Mail Plan", disabledMailPlan)
        }else{
            return createResponse(res, 400, "An error occured while disabling the mail plan")
        }
    }
    
}

module.exports = new MailPlan();