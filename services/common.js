const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const Email = require('email-templates');
const nodemailer = require("nodemailer");
module.exports = {
    codeList : {SUCCESS: 200, RECORD_CREATED: 201, BAD_REQUEST: 400, AUTH_ERROR: 401, FORBIDDEN: 403, NOT_FOUND: 404, INVALID_REQUEST: 405, RECORD_ALREADY_EXISTS: 409, SERVER_ERROR: 500},
    sendCustomResult: (req, res, status_code, message, data) => {
        var result = {
            status: {
                code: module.exports.codeList[status_code],
                message: req.__(message)
            }
        };
        if (typeof data !== 'undefined') {
            result.data = data;
        } else {
            result.data = {};
        }        
        return res.json(result);
    },
    paginateData: (data) => {
        var result = {
            records: data.docs,
            page: data.page,
            total_pages: data.totalPages,
            page_records: (data.docs).length,
            total_records: data.totalDocs,
        }
        return result;
    },
    jwtIssue: (payload) => {
        return jwt.sign(
            payload,
            config.tokenSecret, // Token Secret that we sign it with
            {
              expiresIn : config.jwtExpiryTime // Token Expire time 
            }
          );
    },
    jwtVerify: (token, callback) => {
        return jwt.verify(
            token, // The token to be verified
            config.tokenSecret, // Same token we used to sign
            {}, // No Option, 
            callback //Pass errors or decoded token to callback
          );
    },
    generateOTP:(length) => { 
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < length; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP; 
    },
    sendEmail: async (templateName,toEmail,subject,data)=> {
        let transporter = nodemailer.createTransport(config.mailerSettings);
        const email = new Email({
            message: {
                from: config.fromEmail
            },
            preview:false,
            send:true,
            transport: transporter,
            views: {
                options: {
                    extension: 'ejs' // <---- HERE
                }
            }
        });

        email.send({
            template: templateName,
            message: {
                to: toEmail
            },
            locals: {
                subject: subject,
                data: data
            }
        })
        .then((result) => {
            console.log('Email Result',result);
        })
        .catch((error) => {
            console.log('Email Error',error);
        });
    } 
}