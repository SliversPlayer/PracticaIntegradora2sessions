import { Router } from "express";
import productModel from "../models/product.model.js";

const routerP = Router();

// Obtener todos los productos
routerP.get("/", async (req, res) => {
    try {
        const products = await productModel.find(req.query).lean();
        //res.json({ products });
        res.render("products",{products})
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Obtener un producto por ID
routerP.get("/products/:pid", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid);
        if (!productModel) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json({ status: "success", productModel });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Crear un nuevo producto
routerP.post("/", async (req, res) => {
    try {
        const newProduct = new productModel(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json({ status: "success", product: savedProduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

// Actualizar un producto por ID
routerP.put("/products/:pid", async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json({ status: "success", product: updatedProduct });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

// Eliminar un producto por ID
routerP.delete("/products/:pid", async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.pid);
        if (!deletedProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json({ status: "success", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default routerP;