import { Router } from 'express';
import User from '../../models/user.model.js';
import { createHash, isValidPassword } from '../../../utils.js';
import passport from 'passport'; // Importa el módulo de Passport


const router = Router(); 

router.post('/register', passport.authenticate('register',{failureRedirect:'failregister'}), async (req, res) => {
    res.send({status:"success", message:"Usuario Registrado"})
});

router.get('/failregister', async(req,res) => {
    console.log("Estrategia fallida")
    res.send({ error: "Falló"})
});

router.post('/login', passport.authenticate('login',{failureRedirect:'failLogin'}), async (req, res) => {
    if(!req.user) return res.status(400).send({status:"error", error:"Datos incompletos"})
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
        };
        console.log(req.session.user)
        res.redirect('/profile');

    } catch (err) {
        res.status(500).send('Error al iniciar sesión');
    }
});

router.get('/faillogin', (req,res) => {
    res.send({ error: "Login fallido"})
});
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

export default router;