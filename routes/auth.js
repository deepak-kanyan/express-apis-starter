const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

/**
* @swagger
* /login:
*   post:
*     tags:
*       - Login
*     description: Login user
*     consumes:
*       - application/x-www-form-urlencoded
*     produces:
*       - application/json
*     parameters:

*       - name: email
*         description: Email Id
*         in: formData
*         required: true
*         type: string

*       - name: password
*         description: Password
*         in: formData
*         required: true
*         type: string

*     responses:
*       200:
*         description: User logged in successfully
*       400:
*         description: Bad request
*       401:
*         description: Invalid login details, Please try again
*
*/
router.post('/login', authController.validate('login'), authController.login);

/**
    * @swagger
    * /social_login:
    *   post:
    *     tags:
    *       - Login
    *     description: Login user
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:

    *       - name: name
    *         description: Name
    *         in: formData
    *         required: true
    *         type: string

    *       - name: provider
    *         description: Provider (google,facebook)
    *         in: formData
    *         required: true
    *         type: string

    *       - name: token
    *         description: Token
    *         in: formData
    *         required: true
    *         type: string

    *       - name: uid
    *         description: uid
    *         in: formData
    *         required: true
    *         type: string

    *     responses:
    *       200:
    *         description: User logged in successfully    
    *
    */
router.post('/sociallogin', authController.socialLogin);

/**
    * @swagger
    * /signup:
    *   post:
    *     tags:
    *       - Signup
    *     description: Add new user
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:

    *       - name: name
    *         description: Full name
    *         in: formData
    *         required: true
    *         type: string

    *       - name: email
    *         description: Email
    *         in: formData
    *         required: true
    *         type: string

    *       - name: password
    *         description: password
    *         in: formData
    *         required: true
    *         type: string

    *       - name: device_token
    *         description: Device token
    *         in: formData
    *         required: true
    *         type: string
    
    *     responses:
    *       201:
    *         description: User created successfully    
    *       409:
    *         description: User already exists    
    *       405:
    *         description: Invalid Request. Please try again.    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */
router.post('/signup', authController.validate('signup'), authController.signup);

/**
    * @swagger
    * /verify:
    *   post:
    *     tags:
    *       - Verify
    *     description: Verify user
    *     consumes:
    *       - application/x-www-form-urlencoded
    *     produces:
    *       - application/json
    *     parameters:

    *       - name: email
    *         description: Email
    *         in: formData
    *         required: true
    *         type: string

    *       - name: otp
    *         description: OTP
    *         in: formData
    *         required: true
    *         type: string
    
    *     responses:
    *       200:
    *         description: User verified successfully    
    *       404:
    *         description: User not found    
    *       500:
    *         description: Something went wrong. Server Error    
    *
    */
router.post('/verify', authController.verifyOtp);
module.exports = router;