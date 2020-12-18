const express = require("express");
const bodyParser = require('body-parser');

//require those routes which I created seperately
const userRoute = require("./routes/userApi.js");
const adminRoute = require("./routes/adminApi");
const authRoute = require("./routes/Authentication/authApi.js");
// const { sendSMTPMail } = require("./services/mailtest.js");

const app = express();
app.use(bodyParser.json());


app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use(authRoute);

// sendSMTPMail()

//export route for unit testing and chat
module.exports = app;