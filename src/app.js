import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from "../utils.js"
import { Server } from 'socket.io';

import productRoutes from '../src/routes/products.router.js';
import viewsRouter from '../src/routes/views.router.js';
import socketProducts from "./listener/socketProducts.js"

const app = express()
const PORT=8080
//Modificado según indicación de WM
app.use(express.static(__dirname + "/src/public"))
//handlebars
app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/src/views")
app.set("view engine","handlebars")
//rutas
app.use("/api",productRoutes)
app.use('/', viewsRouter)


const httpServer=app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`)
        console.log(`\t1). http://localhost:${PORT}`)
        console.log(`\t2). http://localhost:${PORT}/realTimeProducts/`)

    }
    catch (err) {
        console.log(err)
    }
})

const socketServer = new Server(httpServer)

socketProducts(socketServer)

/*
// Instancia de Express y del servidor HTTP
const app = express();
const server = http.createServer(app);

const PORT = 8080;

// Middleware para manejar JSON
app.use(express.json());

// Middleware para analizador datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

//Inicializar motor usando app.engine
app.engine('handlebars', handlebars.engine());
app.set('view engine','handlebars');
app.set('views', __dirname+'/src/views');

// Server archivos estáticos
app.use('/', viewsRouter);
app.use("/api",productRoutes)
app.use(express.static(__dirname + '/public'));

// Escuchar eventos de conexión de Socket.IO
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:8080/`);
    console.log(`http://localhost:8080/realTimeProducts/`);
});


// Configura el servidor de Socket.IO
const socketServer = new Server(server);

socketProducts(socketServer)
*/