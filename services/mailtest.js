const nodemailer = require("nodemailer");

module.exports.sendSMTPMail = async function(){
    
    let transporter = nodemailer.createTransport({
        name: "mail.datingapplications.com",
        host: "mail.datingapplications.com",
        port: 465,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: "test@datingapplications.com", // generated ethereal user
          pass: "andyke", // generated ethereal password
        },
        secure:true,
        tls: {rejectUnauthorized: false},
        debug:true
    });
    
      // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Iykeman" <test@datingapplications.com>', // sender address
        to: "ikechukwuapeh@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
}