
import { Router } from 'express';
import ProductManager from '../dao/ProductManager.js'
import { __dirname } from "../../utils.js"


const pm=new ProductManager(__dirname+'/src/bbdd.json')
const routerV = Router()
//Para verificar la correcta ruta
//console.log(__dirname + '/src/bbdd.json');

routerV.get("/",async(req,res)=>{
    const listadeproductos=await pm.getProductsView()
    res.render("home",{listadeproductos})
})

routerV.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts")
    })
    
    export default routerV