import { Router } from 'express'
import cartmg from '../classes/CartManager.js'
const router = Router()

router.get('/', async (req, res) => {
    res.send(`Hola Mundo cart`)
})



export default router
