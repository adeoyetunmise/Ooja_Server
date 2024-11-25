import {Router} from "express"
import authenticate from "../middleware/authenticate.js"
import { getMyProducts, getProduct, getProducts, createProduct } from "../controllers/productController.js"
import upload from '../middleware/multer.js'


const productRoute = Router()

productRoute.get("/", authenticate, getProducts )

productRoute.get("/:id",authenticate, getProduct)

productRoute.get("/myproducts", authenticate, getMyProducts)

productRoute.post("/" , authenticate, upload.single('image'), createProduct)

productRoute.patch("/:id",  (req, res) => {
    res.send('update a product')
} )

productRoute.delete("/:id",  (req, res) => {
    res.send('delete a product')
})

export default productRoute


