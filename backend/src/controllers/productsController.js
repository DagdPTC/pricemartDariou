//Creo un array de métodos
const productController = {};

//Import del Schema de la coleccion
//que vammos a ocupar 

import productsModel from "../models/products.js"

//SELECT

productController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}

//INSERT
productController.postProducts = async (req, res) => {
    // #1 Solicitamos los campos
    const {name, description, price, stock} = req.body;

    const newProducts = new productsModel({name, description, price, stock})

    await newProducts.save()

    res.json({message: "Product save"})
}

//ELIMINAR
productController.deleteproducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Product deleted"})
}

//UPDATE
productController.putProducts = async (req, res) => {
    // Solicitamos los nuevo valores
    const {name, description, price, stock} = req.body;
    await productsModel.findByIdAndUpdate(req.params.id, {
        name,
        description,
        price,
        stock}, {new: true})

        res.json ({message: "product updated"})
};

export default productController;