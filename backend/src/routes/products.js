import express from "express"
import productController from "../controllers/productsController.js"
 "../controllers/productsController.js"

//Router() nos ayudará a colocar los métodos
//que tendrá el endpoint
const router = express.Router()

router.route("/")
.get(productController.getProducts)
.post(productController.postProducts)

router.route("/:id")
.put(productController.putProducts)
.delete(productController.deleteproducts)

export default router;