const express = require("express");
const bodyParser = require('body-parser');

//require those routes which I created seperately
const userRoute = require("./routes/userApi.js");
const authRoute = require("./routes/Authentication/authApi.js");

const app = express();
app.use(bodyParser.json());


app.use("/user", userRoute);
app.use(authRoute);


//export route for unit testing and chat
module.exports = app;