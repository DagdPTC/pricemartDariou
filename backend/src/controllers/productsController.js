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

productController.getProductById = async (req, res) => {
    try {
        const product = await productsModel.findById(req.params.id)

        if(!product){
            return res.status(404).json({message: "product not found"})
        }

        return res.status(200).json({product});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

productController.searchByName = async (req, res) => {
    try {
        const {name} = req.body;

        const products = await productsModel.find({name: {$regex: name, $options: "i"},
        });

        if(!products){
            return res.status(404).json({message: "product not found"})
        }

        return res.status(200).json({products});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

// Productos con stock bajo
productController.getLowStock = async (req, res) => {
    try {
        const products = await productsModel.find({stock: { $lt: 5}})
 
        if(!products){
            return res.status(404).json({message: "Not products found with low stock"})
        }
        return res.status(200).json(products)
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message:"Internal server error"})
    }
};


//FILTROS que el usuario coloque
productController.getProductsByPriceRange = async (req, res) => {
    try {
        const {min, max} = req.body

        const products = await productsModel.find({
            price: {$gte: min,  $lte: max}
        })

        if(!products){
            return res.status(404).json({message: "product not found"})
        }

        return res.status(200).json({product});
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

productController.countProducts = async (req, res) => {
    try {
        const count = await productsModel.countDocuments();

        return res.status(200).json(count)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default productController;