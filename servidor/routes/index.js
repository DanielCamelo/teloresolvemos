const express = require('express');
const axios = require('axios');
require('dotenv').config();

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
const registrarTransporteParticular = require('../controller/serviciosTransporte/registrarTransporteParticular');
const getAllTransporteParticularByUser = require('../controller/serviciosTransporte/getAllTransporteParticularByUser');
const getTransporteParticularByUserIdAndOrderId = require('../controller/serviciosTransporte/getTransporteParticularByUserIdAndOrderId');
const getAllTransporteParticularOrder = require('../controller/serviciosTransporte/getAllTransporteParticularOrder');
const registrarTransporteSalud = require('../controller/serviciosTransporte/registrarTransporteSalud');
const getAllTransporteSaludByUser = require('../controller/serviciosTransporte/getAllTransporteSaludByUser');
const getTransporteSaludByUserIdAndOrderId = require('../controller/serviciosTransporte/getTransporteSaludByUserIdAndOrderId');
const getAllTransporteSaludOrder = require('../controller/serviciosTransporte/getAllTransporteSaludOrder');
const registrarComprasIntermunicipales = require('../controller/servicios/registrarcomprasIntermunicipales');
const getAllComprasIntermunicipalesByUser = require('../controller/servicios/getAllcomprasIntermunicipalesByUser');
const getComprasIntermunicipalesByUserIdAndOrderId = require('../controller/servicios/getcomprasIntermunicipalesByUserIdAndOrderId');
const getAllComprasIntermunicipalesOrder = require('../controller/servicios/getAllcomprasIntermunicipalesOrder');
const registrarDiligencias = require('../controller/servicios/registrarDiligencias');
const getAllDiligenciasByUser = require('../controller/servicios/getAllDiligenciasByUser');
const getDiligenciasByUserIdAndOrderId = require('../controller/servicios/getDiligenciasByUserIdAndOrderId');
const getAllDiligenciasOrder = require('../controller/servicios/getAllDiligenciasOrder');
const assignChoferToOrder = require('../controller/serviciosTransporte/assignChoferToOrder');
const getConductores = require('../controller/user/getConductor');
const actualizarPrecio = require('../controller/servicios/actualizarPrecio');
const allBarrios = require('../controller/barrios/allBarrios');
const uploadBarrio = require('../controller/barrios/uploadBarrios');
const deleteBarrios = require('../controller/barrios/deleteBarrios');
const updateBarrio = require('../controller/barrios/actualizarBarrios');

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


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
router.get('/allConductores', getConductores);



//servicios

//domilicios
router.post('/addDomicilio', authToken,registrarDomicilio);
router.get("/getAllDomicilioByUser",authToken,getAllDomicilioByUser);
router.get("/getDomicilioByUserIdAndOrderId/:orderId",authToken,getDomicilioByUserIdAndOrderId);
router.get('/allOrdenesDomicilio', getAllDomiciliOrder);

//transporte particular
router.post('/addTransporteParticular', authToken,registrarTransporteParticular);
router.get("/getAllTransporteParticularByUser",authToken,getAllTransporteParticularByUser);
router.get("/getTransporteParticularByUserIdAndOrderId/:orderId",authToken,getTransporteParticularByUserIdAndOrderId);
router.get('/allOrdenesTransporteParticular', getAllTransporteParticularOrder);
router.post('/asignar-conductor', assignChoferToOrder);

//transporte salud
router.post('/addTransporteSalud', authToken,registrarTransporteSalud);
router.get("/getAllTransporteSaludByUser",authToken,getAllTransporteSaludByUser);
router.get("/getTransporteSaludByUserIdAndOrderId/:orderId",authToken,getTransporteSaludByUserIdAndOrderId);
router.get('/allOrdenesTransporteSalud', getAllTransporteSaludOrder);

//Compras intermunicipales
router.post('/addComprasIntermunicipales', authToken,registrarComprasIntermunicipales);
router.get("/getAllComprasIntermunicipalesByUser",authToken,getAllComprasIntermunicipalesByUser);
router.get("/getComprasIntermunicipalesByUserIdAndOrderId/:orderId",authToken,getComprasIntermunicipalesByUserIdAndOrderId);
router.get('/allOrdenesComprasIntermunicipales', getAllComprasIntermunicipalesOrder);

//Diligencias
router.post('/addDiligencias', authToken,registrarDiligencias);
router.get("/getAllDiligenciasByUser",authToken,getAllDiligenciasByUser);
router.get("/getDiligenciasByUserIdAndOrderId/:orderId",authToken,getDiligenciasByUserIdAndOrderId);
router.get('/allOrdenesDiligencias', getAllDiligenciasOrder);

//mensajeria
router.post('/addMensaje', authToken,registrarMensajeria);
router.get("/getAllMensajeriaByUser",authToken,getAllMensajeriaByUser);
router.get("/getMensajeriaByUserIdAndOrderId/:orderId",authToken,getMensajeriaByUserIdAndOrderId);
router.get('/allOrdenesMensajeria', getAllMensajeriaOrder);
router.post('/asignar-domiciliario', assignDomiciliaryToOrder);
router.post('/cambiarEstadoMensajeria', updateOrderStatus);
router.post('/actualizarPrecio', actualizarPrecio);



//panel banner
router.get("/all-banners",allBanners);
router.post("/upload-Banner",authToken,UploadBannerController);
router.post("/delete-Banner", authToken, DeleteBannerController); 



//panel barrios
router.get("/all-barrios",allBarrios);
router.post("/upload-barrios",authToken,uploadBarrio);
router.post("/delete-barrios", authToken,deleteBarrios);
router.post("/actualizar-barrios", authToken, updateBarrio);


module.exports = router;
