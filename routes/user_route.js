const express = require("express")
const mongoose = require("mongoose")
const routes = express.Router()
const userAccountModel = require('../models/UserAccount');


/*  Sample username
    {
        "username" : "p@p.com",
        "password" : "password$123"
    }
*/

// 1. Create new account
routes.post('/user/signup', async(req,res) => {
    try {
        const newAccount = new userAccountModel(req.body)
        const account = await newAccount.save()
        return res.status(201).send(account)
    }
    catch (error) {
        return res.status(400).send(error)
    }
})


// 2. Allow user to access the system
routes.post('/user/login', async (req,res) => {
try{
    const user_account= await userAccountModel.findOne({username : req.body.username})
    const user_account_email= await userAccountModel.findOne({email : req.body.email})

    if (user_account == null && user_account_email == null) {         //if user_account  and user_account_email is empty           
        return res.json({
            status: false,             
            message: "User doesn't exist, please sign up"
        })
    }

    else if (user_account == undefined ) {                          //if username is undefine or not declared  
        if (user_account_email.email == req.body.email)             //but email is define and correct
        {
            if (user_account_email.password != req.body.password){        //if database password is not equal to input password
                return res.json({
                    status: false,
                    message: "Invalid Username or Password."
                })
            }
            return res.json({
                status: 200,
                status: true,
                username: user_account_email.username,              //user_account_email is displayed
                email: user_account_email.email,
                message: "User logged in succesfully"
            })
        }     
    }

    else if (user_account_email == undefined){                      //if email is undefine or not declared 
        if (user_account.username == req.body.username)             //but username is define and correct  
        {
            if (user_account.password != req.body.password){        //if database password is not equal to input password
                return res.json({
                    status: false,
                    message: "Invalid Username or Password."
                })
            }
            return res.json({
                status: 200,
                status: true,
                username: user_account.username,                    //user_account is displayed
                email: user_account.email,
                message: "User logged in succesfully"
            })
        }        
    }

    else {                                                          //in case email and username is define
        return res.json({
            status: 200,
            status: true,
            username: user_account_email.username,              
            email: user_account_email.email,
            message: "User logged in succesfully"
        })
    }

}

catch (error) {
    res.status(400).send(error)
}    

});



module.exports = routes