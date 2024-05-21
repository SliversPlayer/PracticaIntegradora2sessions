import mongoose from 'mongoose';

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'users', required: true},
    products: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true, min: 1}}
        ]}
    );

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;