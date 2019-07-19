const User = require('../models/users');
const bcrypt = require('bcrypt');
const { body,check,validationResult } = require('express-validator');
module.exports = {
    login: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {                        
            return commonService.sendCustomResult(req, res, 'INVALID_REQUEST', 'INVALID_REQUEST', { errors: errors.array() });
        }

        User.findOne({email: req.body.email})
        .then(function(userFound){
            if(!userFound){
                commonService.sendCustomResult(req, res, 'AUTH_ERROR', 'INVALID_LOGIN');
            } else {
                var isPasswordMatch = bcrypt.compareSync(req.body.password,userFound.password);
                if(isPasswordMatch){ 
                    var apiResponse = {};
                    apiResponse.user = userFound;
                    apiResponse.token = commonService.jwtIssue({
                        id: userFound.id,
                        role: userFound.role
                    });
                    commonService.sendCustomResult(req, res, 'SUCCESS', 'LOGGEDIN_SUCCESSFULLY',apiResponse);
                } else {
                    commonService.sendCustomResult(req, res, 'AUTH_ERROR', 'INVALID_LOGIN');
                }
            }
        })
        .catch(function(err){
            console.log('Error',err);
            commonService.sendCustomResult(req, res, 'AUTH_ERROR', 'INVALID_LOGIN');
        });        
    },
    socialLogin: (req, res) => {
        commonService.sendCustomResult(req, res, 'SUCCESS', 'Welcome to social login function');
    },
    signup: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {                        
            return commonService.sendCustomResult(req, res, 'INVALID_REQUEST', 'INVALID_REQUEST', { errors: errors.array() });
        }

        User.findOne({email: req.body.email})
        .then(function(userFound){
            if(userFound){
                throw new Error('EMAIL_ALREADY_EXISTS');
            } else {
                return User.create({
                    name: req.body.name,                    
                    email: (req.body.email).toLowerCase(),
                    password: req.body.password,
                    device_token: req.body.device_token,                    
                    otp: commonService.generateOTP(4)
                });
            }            
        })        
        .then(function (result) {    
            commonService.sendEmail('welcome',result.email,'Welcome Email',result);
            commonService.sendCustomResult(req, res, 'SUCCESS', 'USER_REGISTERED_SUCCESSFULLY',result);
        })
        .catch(function (error) {            
            if(error.message  == 'EMAIL_ALREADY_EXISTS'){
                commonService.sendCustomResult(req, res, 'RECORD_ALREADY_EXISTS', 'EMAIL_ALREADY_EXISTS');
            } else {             
                console.log('Error', error);   
                commonService.sendCustomResult(req, res, 'SERVER_ERROR', 'USER_NOT_CREATED');
            }            
        });
    },
    verifyOtp: (req,res) => {
        User.findOne({email: req.body.email,otp: req.body.otp})
        .then(function(userFound){
            if(!userFound){
                throw new Error('USER_NOT_FOUND');
            } else {
                userFound.status = 1;
                userFound.otp = '';
                return userFound.save();
            } 
        })
        .then(function(userUpdated){
            commonService.sendCustomResult(req, res, 'SUCCESS', 'USER_VERIFIED_SUCCESSFULLY',userUpdated);
        })
        .catch(function(error){
            if(error.message  == 'USER_NOT_FOUND'){
                commonService.sendCustomResult(req, res, 'NOT_FOUND', 'USER_NOT_FOUND');
            } else {
                console.log('Error', error);   
                commonService.sendCustomResult(req, res, 'SERVER_ERROR', 'USER_NOT_VERIFIED');
            }            
        });
    },
    validate: (method) => {
        switch (method) {
            case 'signup': {
             return [                 
                check('email', 'Email is required').not().isEmpty().isEmail().withMessage('Invalid Email'),
                check('name', 'Name is required').not().isEmpty().trim(),
                check('password', 'Password is required').not().isEmpty().trim(),
                check('device_token', 'Device token is required').not().isEmpty()                
               ]   
            }
            case 'login': {
             return [                 
                check('email', 'Email is required').not().isEmpty().isEmail().withMessage('Invalid Email'),
                check('password', 'Password is required').not().isEmpty().trim()                
               ]   
            }
          }    
    }
}