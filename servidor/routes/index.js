const express = require('express');
//inicializar router
const router = express.Router();
const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignin');
const authToken = require('../middleware/authToken');
const userDetailsController = require('../controller/user/useDetails');
const userLogout = require('../controller/user/userLogout');
const { forgotPasswordController, resetPasswordController } = require('../controller/user/forgot-password');
const registrarMensajeria = require('../controller/servicios/registrarMensajeria');
//banner
const allBanners = require('../controller/banner/allBanner');
const DeleteBannerController = require('../controller/banner/deleteBaner');
const UploadBannerController = require('../controller/banner/uploadBaner');
//panel usuario en administrador
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const deleteUser = require('../controller/user/deleteUser');


//panel usuario en administrador
router.get("/all-user",authToken,allUsers);
router.post("/update-user",authToken,updateUser);
router.post("/delete-user",authToken,deleteUser);





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

//panel banner
router.get("/all-banners",allBanners);
router.post("/upload-Banner",authToken,UploadBannerController);
router.post("/delete-Banner", authToken, DeleteBannerController); 
