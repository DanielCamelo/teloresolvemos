const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./routes/index');
const router = require('./routes');


const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
// Middleware para parsear JSON
app.use(express.json());

app.use(cookieParser());
// Usar las rutas de usuarios
app.use("/api", router);

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
    app.listen(PORT, () => {
        
        console.log("servidor esta corriendo en el puerto", PORT);
    });
})



