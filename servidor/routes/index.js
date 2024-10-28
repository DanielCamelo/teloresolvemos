const express = require('express');
const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignin');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/user/useDetails');
const userLogout = require('../controller/user/userLogout');
const { forgotPasswordController, resetPasswordController } = require('../controller/user/forgot-password');
const registrarMensajeria = require('../controller/servicios/registrarMensajeria');

const router = express.Router();



router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post('/send-verification-code', userSignUpController);
router.post('/verify-code', userSignUpController); 
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);



//servicios
//mensajeria
router.post('/addMensaje', authToken,registrarMensajeria);

module.exports = router;