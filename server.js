const express = require("express");

//require those routes which I created seperately
const userRoute = require("./routes/UserRoute.js");

const routeNotFoundErrorHandler = require("./middlewares/RouteNotFoundErrorHandler");


const app = express();
app.use("/user", userRoute);

app.get("/chat", function (req, res) {
	res.sendFile(__dirname + "/chatDemo.html");
});

//404 route not found error
app.all("*", routeNotFoundErrorHandler);

//you can still listen to the server here
//export route for unit testing and chat
module.exports = app;
