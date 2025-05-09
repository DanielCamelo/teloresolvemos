const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');


const app = express();
// redireccion de www a sin www
app.use((req, res, next) => {
    if (req.headers.host.startsWith('www.')) {
        const newHost = req.headers.host.replace('www.', '');
        return res.redirect(301, `${req.protocol}://${newHost}${req.originalUrl}`);
    }
    next();
});


app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
    app.listen(PORT, () => {
        
        console.log("servidor esta corriendo en el puerto", PORT);
    });
})





