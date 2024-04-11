import express from 'express'
import { __dirname } from '../utils.js'
import ProductManager from '../classes/ProductManager.js'
const productRouter = express()

const path_products = __dirname+'/assets/productos.json'

const pmg = new ProductManager(path_products)

productRouter.use(express.json())
productRouter.use(express.urlencoded({extended: true}))


productRouter.get('/',async (req, res) => {
    let prods = await pmg.getProducts()
    res.status(200).send(`Les productos son: ${JSON.stringify(prods)}`)
})

// enpoint para crear un usuario
productRouter.post('/',async (req, res) => {
    const {title,description,price,thumbnail,code,stock} = req.body
    console.log(title,description,price,thumbnail,code,stock)
    if(!title|| !description|| !price|| !thumbnail|| !code|| !stock) return res.send({status: 'error', error: 'faltan campos'})
    let result = await pmg.addProduct(title,description,price,thumbnail,code,stock)
    res.status(200).send({ status: 'success', payload: result})
})

// endpoint para traer un usuario por id
//// http://localhost:8080 + /api/users + /uid
productRouter.get('/:pid', async (req, res)=>{
    const {pid} = req.params
    const productFound = await pmg.getProductById(parseInt(pid))
    res.send({status: 'success', payload: productFound})
    
})
// Endpoint para actualizar un producto
productRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params
    const {title,description,price,thumbnail,code,stock} = req.body
    let updateProduct = await pmg.updateProduct(parseInt(pid),title,description,price,thumbnail,code,stock)  
    res.send({status: 'success', payload: updateProduct})

})

// endpoint para eliminar un producto
productRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params

    const userdeleted = await pmg.deleteProduct(parseInt(pid))

    res.send({status: 'success', payload: userdeleted})
})


export default productRouter
