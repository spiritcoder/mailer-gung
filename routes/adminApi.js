const express = require('express');
const requireLogin = require('../middlewares/requireLogin')
const router = express.Router();

const mailPlanController = require('../Controllers/Admin/mailPlan')
const userManagerController = require('../Controllers/Admin/userManager')

/*----------Mail Plan Routes-----------------*/
router.use('/create-mail-plan', mailPlanController.create_mail_plan)
router.use('/get-all-mail-plans', mailPlanController.get_all_mail_plans)
router.use('/get-a-mail-plan/:mailPlanId', mailPlanController.get_a_mail_plan)
router.use('/disable-a-mail-plan/:mailPlanId', mailPlanController.disable_mail_plan)
router.use('/update-mail-plan', mailPlanController.update_mail_plan)


/*----------User Management Routes-----------------*/
router.use('/get-all-users', userManagerController.get_all_users)
router.use('/get-a-user/:userId', userManagerController.get_a_user)
router.use('/disable-a-user/:userId', userManagerController.disable_a_user)
router.use('/upgrade-a-user', userManagerController.upgrade_a_user)



module.exports = router;
