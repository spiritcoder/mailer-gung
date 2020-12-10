module.exports.createResponse = (res, statusCode, message, data) => {
	if(!statusCode) statusCode = 200;

	const success = `${statusCode}`.startsWith("2");
	if(!message) message = "";

	// console.log('error');
	return res.status(statusCode).json({
		success,
		status: statusCode,
		message,
		data,
		// stack
	});
};
