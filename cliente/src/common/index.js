const backendDomin = process.env.REACT_APP_BACKEND_URL//"http://localhost:5000"

const SummaryApi = {
    sendVerificationCode: {
        url: `${backendDomin}/api/send-verification-code`, // Asegúrate de que esta URL sea correcta
        method: "post"
    },
    verifyCode: {
        url: `${backendDomin}/api/verify-code`, // Asegúrate de que esta URL sea correcta
        method: "post"
    },
    forgotPassword: {
        url: `${backendDomin}/api/forgot-password`, // Asegúrate de que esta URL sea correcta
        method: "post"
    },
    resetPassword: {
        url: `${backendDomin}/api/reset-password`, // Asegúrate de que esta URL sea correcta
        method: "post"
    },
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    actualizarUser : {
        url : `${backendDomin}/api/actualizarUsuario`,
        method : "post"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    addMensaje : {
        url : `${backendDomin}/api/addMensaje`,
        method : 'post'
    },
    addDomicilio : {
        url : `${backendDomin}/api/addDomicilio`,
        method : 'post'
    },
    addTransporteParticular : {
        url : `${backendDomin}/api/addTransporteParticular`,
        method : 'post'
    },
    //rutas de banner
    uploadBanner: {
        url: `${backendDomin}/api/upload-Banner`,
        method: "post",
      },
      deleteBanner: {
        url: `${backendDomin}/api/delete-Banner`,
        method: "post",
      },
      allBanner: {
        url: `${backendDomin}/api/all-banners`,
        method: "get",
      },
      //rutas de usuario
      deleteUser: {
        url: `${backendDomin}/api/delete-user`,
        method: "post",
      },
      allUser: {
        url: `${backendDomin}/api/all-user`,
        method: "get",
      },
        updateUser: {
            url: `${backendDomin}/api/update-user`,
            method: "post",
        },
        registrarRepartidor : {
            url : `${backendDomin}/api/registrarRepartidor`,
            method : 'post'
        },
        registrarConductor: {
            url: `${backendDomin}/api/registrarConductor`,
            method: 'post'
        },
        getAllMensajeriaByUser:{
            url : `${backendDomin}/api/getAllMensajeriaByUser`,
            method : 'get'
        },
        getAllDomicilioByUser:{
            url : `${backendDomin}/api/getAllDomicilioByUser`,
            method : 'get'
        },
        getMensajeriaByUserIdAndOrderId : {
            url : (orderId) => `${backendDomin}/api/getMensajeriaByUserIdAndOrderId/${orderId}`,
            method : 'get'
        },
        getDomicilioByUserIdAndOrderId : {
            url : (orderId) => `${backendDomin}/api/getDomicilioByUserIdAndOrderId/${orderId}`,
            method : 'get'
        },
        getClientes: {
            url: `${backendDomin}/api/get-clientes`,
            method: "post"
        },
        allUser: {
            url: `${backendDomin}/api/all-user`,
            method: "get"
          },
          updateUser: {
            url: `${backendDomin}/api/update-user`,
            method: "post"
          },
          deleteUser: {
            url: `${backendDomin}/api/delete-user`,
            method: "post"
          },
          allOrdenesMensajeria: {
            url: `${backendDomin}/api/allOrdenesMensajeria`,
            method: "get"
          },
            allOrdenesDomicilio: {
                url: `${backendDomin}/api/allOrdenesDomicilio`,
                method: "get"
            },
            assignDomiciliario: {
                url: `${backendDomin}/api/asignar-domiciliario`,
                method: "post"
            },
            cambiarEstadoMensajeria: {
                url: `${backendDomin}/api/cambiarEstadoMensajeria`,
                method: "post"
            },
            getDomiciliarios:{
                url: `${backendDomin}/api/allDomiciliarios`,
                method: "get"
            },
            allOrdenesRepatidor:{
                url: `${backendDomin}/api/allOrdenesRepatidor`,
                method: "get"
            }
            
}


export default SummaryApi;