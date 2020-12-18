const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailPlanSchema = new Schema({
    planName: String,
    features: [String],
    numberOfMailsPerMonth: {type: Number, default: 0},
    durationInMonths:  {type: Number, default: 0},
    price: Number,
    oldPrice: Number,
    description: String,
	isActive: {type: Boolean, default:true}
}, {
	timestamps: true,
});

const User = mongoose.model("MailPlan", mailPlanSchema);
module.exports = User;
