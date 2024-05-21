import mongoose from 'mongoose';

const userCollection = "users"

const userSchema = new mongoose.Schema({
    nombre: {type: String, requiered:true, max: 100, trim: true},
    apellido: {type: String, requiered:true, max: 100, trim: true},
    email: {type: String, requiered:true, max: 100, trim: true},

})

const userModel=mongoose.model(userCollection, userSchema)

export default userModel