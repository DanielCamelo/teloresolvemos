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
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    }




}


export default SummaryApi