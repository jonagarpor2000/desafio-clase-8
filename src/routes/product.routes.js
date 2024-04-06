import { Router } from 'express'
import { __dirname } from '../utils.js'
import ProductManager from '../classes/ProductManager.js'
import CartManager from '../classes/CartManager.js'
const router = Router()

let srcdirectory =__dirname + '/assets/products.json'

const prodmg = new ProductManager(srcdirectory)
//crtmg = new CartManager()
// configurar con alguna entidad
// router.get('/', (req, res) => {} )
// router.post('/', (req, res) => {} )




router.get('/', async (req, res) => {
    let prods = await prodmg.getProducts()
    res.status(200).send(`Los productos son: ${prods}`)
    console.log(`Prods: ${prods}`)
})

// enpoint para crear un usuario
/*router.post('/', (req, res) => {
    console.log(req.body)
    const { first_name, last_name, email, password} = req.body
    // console.log(first_name, last_name, email, password)
    if(!email || !password) return res.send({status: 'error', error: 'faltan campos'})

    const newUser = {
        id: users.length +1,
        first_name,
        last_name,
        email, 
        password
    }

    users.push(newUser)


    res.status(200).send({ status: 'success', payload: newUser })
})

// endpoint para traer un usuario por id
//// http://localhost:8080 + /api/users + /uid
router.get('/:uid', (req, res)=>{
    const {uid} = req.params
    const userFound = users.find(user => user.id === parseInt(uid))
    // agregar validación
    res.send({status: 'success', payload: userFound})
    
})
// Endpoint para actualizar un usuario
router.put('/:uid', (req, res) => {
    const { uid } = req.params
    const userToUpdate = req.body

    const userIndex = users.findIndex(user => user.id === parseInt(uid))
    if( userIndex === -1 ) return res.status(404).send({status: 'error', error: 'user not foun'})

    users[userIndex] = { id: parseInt(uid),  ...userToUpdate }

        

    res.send({status: 'success', payload: userToUpdate})

})

// endpoint para eliminar un usuario
router.delete('/:uid', (req, res) => {
    const { uid } = req.params

    const usersResutl = users.filter(user => user.id !== parseInt(uid))

    res.send({status: 'success', payload: usersResutl})
})*/


export default router


// class -> function contructora function Router()