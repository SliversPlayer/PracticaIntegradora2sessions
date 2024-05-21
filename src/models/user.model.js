import mongoose from 'mongoose';

const userCollection = "users"

const userSchema = new mongoose.Schema({
    nombre: {type: String, requiered:true, max: 100},
    apellido: {type: String, requiered:true, max: 100},
    email: {type: String, requiered:true, max: 100}

})

const userModel=mongoose.model(userCollection, userSchema)

export default userModel