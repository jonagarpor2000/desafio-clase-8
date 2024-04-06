import express from 'express'
import productsRouter from './routes/product.routes.js'
import cartsRouter from './routes/cart.routes.js'

const app = express()

// para poder leer los json
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

app.listen(8080, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})