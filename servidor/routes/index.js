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

const deleteUser = require('../controller/user/deleteUser');
const registrarRepartidor = require('../controller/user/registrarRepartidor ');
const registrarConductor = require('../controller/user/registrarConductor');
const getAllMensajeriaByUser = require('../controller/servicios/getAllMensajeriaByUser');
const getMensajeriaByUserIdAndOrderId = require('../controller/servicios/getMensajeriaByUserIdAndOrderId');
const updateUser = require('../controller/user/updateuser');
const assignDomiciliaryToOrder = require('../controller/servicios/assignDomiciliaryToOrder ');
const updateOrderStatus = require('../controller/servicios/updateOrderStatus ');
const getDomiciliarios = require('../controller/user/getDomiciliarios');
const getClientesByIds = require('../controller/user/getUserById');
const getAllMensajeriaOrder = require('../controller/servicios/getAllMensajeriaOrder ');
const updateUserDetailsController = require('../controller/user/updateUserDatail');
const registrarDomicilio = require('../controller/servicios/registrarDomicilio');
const getAllDomicilioByUser = require('../controller/servicios/getAllDomicilioByUser');
const getDomicilioByUserIdAndOrderId = require('../controller/servicios/getDomicilioByUserIdAndOrderId');
const getAllDomiciliOrder = require('../controller/servicios/getAllDomicilioOrder');
const getOrdenesPorRepartidor = require('../controller/Perfiles/ordenesRepartidor');
const registrarTransporteParticular = require('../controller/serviciosTransporte.js/registrarTransporteParticular');


//panel usuario en administrador
router.get("/all-user",authToken,allUsers);
router.post("/update-user",authToken,updateUser);
router.post("/delete-user",authToken,deleteUser);
router.post('/get-clientes', getClientesByIds);
router.post("/actualizarUsuario",authToken,updateUserDetailsController);


//panel del usuario en domiciliario
router.get("/allOrdenesRepatidor",authToken,getOrdenesPorRepartidor);





router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post('/send-verification-code', userSignUpController);
router.post('/verify-code', userSignUpController); 
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

//cambio de rol
router.post('/registrarRepartidor', authToken,registrarRepartidor);
router.post('/registrarConductor', authToken,registrarConductor);
//obtener domiciliarios
router.get('/allDomiciliarios', getDomiciliarios);



//servicios

//domilicios
router.post('/addDomicilio', authToken,registrarDomicilio);
router.get("/getAllDomicilioByUser",authToken,getAllDomicilioByUser);
router.get("/getDomicilioByUserIdAndOrderId/:orderId",authToken,getDomicilioByUserIdAndOrderId);
router.get('/allOrdenesDomicilio', getAllDomiciliOrder);

//transporte particular
router.post('/addTransporteParticular', authToken,registrarTransporteParticular);

//mensajeria
router.post('/addMensaje', authToken,registrarMensajeria);
router.get("/getAllMensajeriaByUser",authToken,getAllMensajeriaByUser);
router.get("/getMensajeriaByUserIdAndOrderId/:orderId",authToken,getMensajeriaByUserIdAndOrderId);
router.get('/allOrdenesMensajeria', getAllMensajeriaOrder);
router.post('/asignar-domiciliario', assignDomiciliaryToOrder);
router.post('/cambiarEstadoMensajeria', updateOrderStatus);



//panel banner
router.get("/all-banners",allBanners);
router.post("/upload-Banner",authToken,UploadBannerController);
router.post("/delete-Banner", authToken, DeleteBannerController); 

module.exports = router;
