import { Router } from 'express';
import cartModel from '../models/cart.model.js';
import productModel from '../models/product.model.js';

const routerC = Router();

// Obtener todos los carritos
routerC.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find().populate({
            path: 'products.productId',
            select: 'code title description price category stock'
        }).populate('userId');
        res.json({ status: 'success', payload: carts });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener los carritos' });
    }
});

// Crear un nuevo carrito
routerC.post('/', async (req, res) => {
    try {
        const newCart = new cartModel(req.body);
        const savedCart = await newCart.save();
        res.status(201).json({ status: 'success', payload: savedCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al crear el carrito' });
    }
});

// Actualizar un carrito con un arreglo de productos
routerC.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const products = req.body.products;
        const updatedCart = await cartModel.findByIdAndUpdate(cartId, { products }, { new: true });
        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al actualizar el carrito' });
    }
});

// Eliminar todos los productos del carrito
routerC.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const updatedCart = await cartModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al eliminar los productos del carrito' });
    }
});

// Agregar un producto al carrito
routerC.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }
        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
        const updatedCart = await cart.save();
        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al agregar el producto al carrito' });
    }
});

// Actualizar la cantidad de un producto en el carrito
routerC.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity = quantity;
            const updatedCart = await cart.save();
            return res.json({ status: 'success', payload: updatedCart });
        }
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al actualizar la cantidad del producto en el carrito' });
    }
});

// Eliminar un producto del carrito
routerC.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartModel.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        const filteredProducts = cart.products.filter(item => item.productId.toString() !== productId);
        cart.products = filteredProducts;
        const updatedCart = await cart.save();
        res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al eliminar el producto del carrito' });
    }
});

export default routerC;