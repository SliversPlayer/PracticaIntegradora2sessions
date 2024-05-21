import mongoose from 'mongoose';

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: {type: String, requiered:true, max: 100, trim: true},
    description: {type: String, requiered:true, max: 100, trim: true},
    price: {type: Number, requiered:true, min:0},
    category: {type: String, requiered:true, max: 100, trim: true},
    code: {type: String, requiered:true, max: 100, unique: true, trim: true},
    stock: {type: String, requiered:true, max: 50, trim: true}
})

const productModel=mongoose.model(productsCollection, productsSchema)

export default productModel