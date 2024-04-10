import { Router } from 'express'
import cartmg from '../classes/CartManager.js'
const cartRouter = Router()
const path = './src/assets/carts.json'

const carts = new cartmg(path)

cartRouter.get('/', async (req, res) => {
    
})

cartRouter.get('/:cid', async (req, res) => {
    
})
cartRouter.post('/', async (req, res) => {
    
})

cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const {cid,pid} = req.params
    const resp = await carts.addProductToCart(cid,{product:pid,quantity:1})

})
export default cartRouter
