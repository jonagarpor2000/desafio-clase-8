import { Router } from 'express'
import cartmg from '../classes/CartManager.js'
const cartRouter = Router()
const path_carts = './src/assets/carrito.json'

const carts = new cartmg(path_carts)

cartRouter.get('/', async (req, res) => {
    let carritos = await carts.getCarts()
    res.status(200).send(`Los carritos son: ${JSON.stringify(carritos)}`)
})

cartRouter.get('/:cid', async (req, res) => {
    const {cid} = req.params
    const cartFound = await carts.getCartById(parseInt(cid))
    res.send({status: 'success', payload: cartFound})
    
})
cartRouter.post('/', async (req, res) => {
    let response = await carts.createCart()
    res.status(200).send({ status: 'success', payload: response})
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const {cid,pid} = req.params
    const resp = await carts.addProductToCart(cid,{products:pid,quantity:1})

})
export default cartRouter
