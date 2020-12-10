const dao = require('../../db/mongodb/dao')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

class Auth {

    async signup(req, res, error) {
        const {fullname,email,password} = req.body
        if(!fullname || !email || !password){
            return res.status(422).json({err: "please add all the fields"})
        }
        const foundEmail = dao.findOne("User", {email:email})
        console.log(foundEmail);
    }
    
    // async signin(req, res, error){
    //     const {email,password} = req.body
    //     if(!email || !password) {
    //         return res.status(422).json({error: "Please provide the email and password"})
    //     }
    //     User.findOne({email: email})
    //     .then(savedUser => {
    //         if(!savedUser){
    //             return res.status(422).json({error: "Invalid email or password"})
    //         }
    //         bcrypt.compare(password, savedUser.password)
    //         .then(doMatch => {
    //             if(doMatch){
    //                 // return res.json({message: "successfully signed in"})
    //                 const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
    //                 res.json({token})
    //             }
    //             return res.status(422).json({error: "Invalid email or password"})
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    //     })
    // }
}

module.exports = new Auth();