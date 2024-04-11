import express from 'express'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'

const app = express()

// para poder leer los json
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
    next()
})

app.listen(8080, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})