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
    addTransporteSalud: {
        url : `${backendDomin}/api/addTransporteSalud`,
        method : 'post'
    },
    addComprasIntermunicipales : {
        url : `${backendDomin}/api/addComprasIntermunicipales`,
        method : 'post'
    },
    addDiligencias : {
        url : `${backendDomin}/api/addDiligencias`,
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
        getAllTransporteParticularByUser:{
            url : `${backendDomin}/api/getAllTransporteParticularByUser`,
            method : 'get'
        },getAllTransporteSaludByUser:{
            url : `${backendDomin}/api/getAllTransporteSaludByUser`,
            method : 'get'
        },
        getAllComprasIntermunicipalesByUser:{
            url : `${backendDomin}/api/getAllComprasIntermunicipalesByUser`,
            method : 'get'
        },
        getAllDiligenciasByUser:{
            url : `${backendDomin}/api/getAllDiligenciasByUser`,
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
        getTransporteParticularByUserIdAndOrderId : {
            url : (orderId) => `${backendDomin}/api/getTransporteParticularByUserIdAndOrderId/${orderId}`,
            method : 'get'
        },
        getTransporteSaludByUserIdAndOrderId : {
            url : (orderId) => `${backendDomin}/api/getTransporteSaludByUserIdAndOrderId/${orderId}`,
            method : 'get'
        },
        getComprasIntermunicipalesByUserIdAndOrderId : {
            url : (orderId) => `${backendDomin}/api/getComprasIntermunicipalesByUserIdAndOrderId/${orderId}`,
            method : 'get'
        },
        getDiligenciasByUserIdAndOrderId : {
            url : (orderId) => `${backendDomin}/api/getDiligenciasByUserIdAndOrderId/${orderId}`,
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
            allOrdenesTransporteParticular: {
                url: `${backendDomin}/api/allOrdenesTransporteParticular`,
                method: "get"
              },
              allOrdenesTransporteSalud: {
                url: `${backendDomin}/api/allOrdenesTransporteSalud`,
                method: "get"
              },
              allOrdenesComprasIntermunicipales: {
                url: `${backendDomin}/api/allOrdenesComprasIntermunicipales`,
                method: "get"
              },
              allOrdenesDiligencias: {
                url: `${backendDomin}/api/allOrdenesDiligencias`,
                method: "get"
              },
            assignDomiciliario: {
                url: `${backendDomin}/api/asignar-domiciliario`,
                method: "post"
            },
            assignConductor: {
                url: `${backendDomin}/api/asignar-conductor`,
                method: "post"
            },
            cambiarEstadoMensajeria: {
                url: `${backendDomin}/api/cambiarEstadoMensajeria`,
                method: "post"
            },
            cambiarPrecio: {
                url: `${backendDomin}/api/actualizarPrecio`,
                method: "post"
            },
            getDomiciliarios:{
                url: `${backendDomin}/api/allDomiciliarios`,
                method: "get"
            },
            getConductores:{
                url: `${backendDomin}/api/allConductores`,
                method: "get"
            },
            allOrdenesRepatidor:{
                url: `${backendDomin}/api/allOrdenesRepatidor`,
                method: "get"
            }
            
            
}


export default SummaryApi;