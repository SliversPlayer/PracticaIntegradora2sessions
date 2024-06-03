import { Router } from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/user.model.js';

const router = Router();

// Función para manejar errores
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
};

// Registro de usuarios
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).json({ status: 'error', message: 'Todos los campos son obligatorios' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'El usuario ya está registrado' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = new userModel({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
        });

        // Guardar el usuario en la base de datos
        const savedUser = await newUser.save();
        res.status(201).json({ status: 'success', payload: savedUser });
    } catch (error) {
        handleError(res, error);
    }
});

// Inicio de sesión de usuarios
router.get('/login', (req, res) => {
    res.render('login');
});

// Cierre de sesión
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'No se pudo cerrar la sesión' });
        }
        res.json({ status: 'success', message: 'Sesión cerrada exitosamente' });
    });
});

export default router;
