import path from 'path';

const {promises: fs, readFile,writeFile} = import ('fs');

/***
 * @typedef {Object} Product
 * @property {number} id identificador autoincremental
 * @property {string} title titulo del producto
 * @property {string} description (Descripcion del producto)
 * @property {number} price (precio del producto)
 * @property {string} thumbnail (ruta de imagen)
 * @property {string} code (código identificador)
 * @property {number} stock (número de piezas disponibles)
 */

/**
 *  @constant
 *  @default
 */

export default class CartManager{

 /**
     * @type {Array<Product>}
     */
#products;
/**
 * @type {string} String que contiene error en caso de de que el retorno o cargado de productos falle.
 */
#error;
/**
 * @type {string} Ubicacion del archivo
 */
path;

 constructor(path){
     this.#products = [];
     this.#error=undefined;
     this.path = path
 }
    getCarts = async() =>{
        
    }


    createCart = async(cid,pid) =>{
        try {
            const contenido = await fs.readFile(this.path,'utf-8')
            const carts = JSON.parse(contenido)
            if(carts.find(cart => cart.id === cid)){
                this.#error = 'El identificador de la carta ya existe'
            }else{
                const cart = {
                    id: cid,
                    products: [pid]
                }
                carts.push(cart)
                await fs.writeFile(this.path, JSON.stringify(carts,null,'\t'),'utf-8' );
                return 'Carta creada'
            }
        } catch(error){
            console.log()
        }
        
    }

    #getNextId(){
        let ultimaposicion = 1;
        if(this.#products.length === 0){
            return ultimaposicion;
        }
        ultimaposicion = this.#products.at(-1).id + 1; //Esto es por si me eliminan valores del medio
        return ultimaposicion;
    }

    

    #readfilecontent = async (path) => {
        try{
            const contenido = await fs.readFile(path,'utf-8')
            return JSON.parse(contenido)
        }catch (error){

            return []
        }
    }

    #writefilecontent = async () => {
        try{
            fs.writeFile(this.path, JSON.stringify(this.#products,null,'\t'),'utf-8' );
            return 'Producto aniadido'
        }catch (error){

            this.#error = 'Ocurrio un error al escribir el archivo'
            return this.#error
        }
    }

    #validateCartEntries = (title, description, price, thumbnail, code, stock) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            this.#error = `[${code}]: campos incompletos`
        } else {
            const found = this.#products.find(producto => producto.code === code)
            if (found) this.#error = `[${code}]: el identificador del producto ya existe`
            else this.#error = undefined
        }
    }

    deleteProduct = async (id)=>{
        let content = await this.getProducts()
        let cont_nodelete = content.filter(producto => producto.id != id)
        await fs.writeFile(this.path, JSON.stringify(cont_nodelete, null,'\t'),'utf-8')
    }

    updateProduct = async (id,title, description, price, thumbnail,code,stock)=>{
        let contenido = await this.getProducts()
        let map_cont = contenido.map(producto => producto.id)
        let indx = map_cont.indexOf(id)
        if(indx===-1){
            console.log('No existe tal producto');
        }else{
            let prod = {
                'id': id,
                'title': title,
                'description': description,
                'price': price,
                'thumbnail': thumbnail,
                'code': code,
                'stock': stock
            }
            contenido.splice(indx,1,prod)
            await fs.writeFile(this.path, JSON.stringify(contenido, null,'\t'))
        }
        


    };
}



