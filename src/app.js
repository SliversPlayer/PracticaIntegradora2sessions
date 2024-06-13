import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import { __dirname } from '../utils.js';
import { Server } from 'socket.io';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

// Importa tus routers y otros módulos necesarios
import productsRouter from '../src/routes/products.router.js';
import cartsRouter from '../src/routes/carts.router.js';
import messagesRouter from '../src/routes/messages.router.js';
//import usersRouter from './routes/Xusers.router.jsX';
import viewsRouter from '../src/routes/views.router.js';
import socketProducts from './listener/socketProducts.js';
import sessionsRouter from './routes/api/sessions.js';
// appname RefactorLogin53150
// callback url http://localhost:8080/api/sessions/githubcallback
// Client ID: Iv23li31EN8JaTViDu3h
// Cliente secret: 6c7c5acbeedc6ba73ddda81cd9398d31b131fda9
const app = express();
const PORT = 8080;

// Variables de conexión
const db = 'ecommerce';
const user = 'usuario1';
const pass = encodeURIComponent('123456a.');
const conString = `mongodb+srv://${user}:${pass}@cluster0.24yvhip.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;

// Conexión a MongoDB
mongoose.connect(conString, {

}).then(() => {
    console.log('Conectado a MongoDB');
}).catch((error) => {
    console.error('Error conectándose a MongoDB', error);
});

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.static(__dirname + "/src/public"));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: conString }),
    // cookie: { maxAge: 180 * 60 * 1000 },
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Middleware para manejar las rutas
app.use('/', viewsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);

const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`);
        //console.log(`\t1). http://localhost:${PORT} (BD JSON)`);
        //console.log(`\t2). http://localhost:${PORT}/realTimeProducts/`);
        console.log(`\t1). http://localhost:${PORT}/api/products`);
        console.log(`\t2). http://localhost:${PORT}/api/messages`);
        console.log(`\t3). http://localhost:${PORT}/login`);
    } catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer);

socketProducts(socketServer);
