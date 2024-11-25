import { Router } from "express"
import { createProduct, getMyProduct, getProduct, getProducts } from "../controllers/productController.js"
import authenticate from "../middleware/authenticate.js"
import upload from "../middleware/multer.js"


const productRouter = Router()

productRouter.post('/addProduct', authenticate, upload.single('image') ,createProduct)


productRouter.get('/myProduct', authenticate, getMyProduct)

productRouter.get('/getAllProduct', authenticate, getProducts)

productRouter.get('/:id', authenticate, getProducts)

productRouter.patch('/:id', (req, res) => {
    res.send('Edit the product')
})

productRouter.delete('/removeProduct', (req, res) => {
    res.send('Kindly remove the product')
})


export default productRouter;