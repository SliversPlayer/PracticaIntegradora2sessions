import { Router } from 'express';
import cartModel from '../models/cart.model.js';

const routerC = Router();

// Obtener todos los carritos
routerC.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find().populate('userId').populate('products.productId');
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los carritos' });
    }
});

// Crear un nuevo carrito
routerC.post('/', async (req, res) => {
    try {
        const newCart = new cartModel(req.body);
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el carrito' });
    }
});

// Actualizar un carrito
routerC.put('/:id', async (req, res) => {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el carrito' });
    }
});

// Eliminar un carrito
routerC.delete('/:id', async (req, res) => {
    try {
        const deletedCart = await cartModel.findByIdAndDelete(req.params.id);
        res.json(deletedCart);
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el carrito' });
    }
});

export default routerC;
