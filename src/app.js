import express from 'express';
import handlebars from 'express-handlebars';
import mongoose, { mongo } from 'mongoose'
import { __dirname } from "../utils.js"
import { Server } from 'socket.io';
import path from 'path';

import productsRouter from '../src/routes/products.router.js';
import cartsRouter from '../src/routes/carts.router.js';
import messagesRouter from '../src/routes/messages.router.js';
import usersRouter from '../src/routes/users.router.js';

import viewsRouter from '../src/routes/views.router.js';
import socketProducts from "./listener/socketProducts.js"

//test

const app = express()
const PORT=8080

app.use(express.static(__dirname + "/src/public"))
//handlebars
app.engine("handlebars",handlebars.engine())
app.set('views', path.join(__dirname, '/src/views'));
app.set("view engine","handlebars")
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


//Datos de conexión a moongose
let db = "ecommerce"
let pass = "123456a."

let conString = `mongodb+srv://usuario1:${pass}@cluster0.24yvhip.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(conString).then(()=>{console.log("Conectado")}).catch(error=>console.error("Error en la conexión",error))

// Middleware para manejar las rutas de productos
app.use('/', viewsRouter)
app.use("/api/messages",messagesRouter)
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use("/api/users",usersRouter)

const httpServer=app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`)
        console.log(`\t1). http://localhost:${PORT} (BD JSON)`)
        console.log(`\t2). http://localhost:${PORT}/realTimeProducts/`)
        console.log(`\t3). http://localhost:${PORT}/api/products (BD Moongose)`);
        console.log(`\t4). http://localhost:${PORT}/api/messages (BD Moongose)`);

    }
    catch (err) {
        console.log(err)
    }
})

const socketServer = new Server(httpServer)

socketProducts(socketServer)