const brandsController = {};

import brandsModel from "../models/brands.js"

//SELECT
brandsController.getBrand = async (req, res) => {
    try{
        const brands = await brandsModel.find()
        return res.status(200).json(brands)
    } catch (error) {
        console.log("Error" + error)
        return res.tatus(500).json({message: "Internal server error"})
    }
}

//INSERT
brandsController.insertBrand = async (req, res) => {
    try{
        let {name, slogan, address, isActive} = req.body;

        //Validaciones
        name = name?.trim();
        slogan = slogan?.trim();
        address = address?.trim(); 

        //Validaciones de datos null
        if (!name || !slogan || !address) {
            return res.status(400).json({message: "All fields are required"})
        }

        if (name.length < 3) {
            return res.status(400).json({message: "name too short"})
        }

        if (address.length > 100)  {
            return res.status(400).json({message: "address too long"})
        }

        const newBrand = new brandsModel({name, slogan, address, isActive})
        await newBrand.save()

        return res.status(201).json({message: "Brand saved"})
    } catch (error) { 
        console.log("Error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

//DELETE
brandsController.deleteBrand = async (req, res) => {
    try {
        const deleteBrand = await brandsModel.findByIdAndDelete(req.params.id)

        if (!deleteBrand) {
            return res.status(404).json({message: "brand not found"})
        }

        return res.status(200).json({message: "brand deleted"})
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
}

//UPDATE
brandsController.updateBrand = async (req, res) => {
    try {
        let {name, slogan, address, isActive} = req.body;

        //Validaciones
        name = name?.trim();
        slogan = slogan?.trim();
        address = address?.trim(); 

        if (name.length < 3) {
            return res.status(400).json({message: "name too short"})
        }

        if (address.length > 100) {
            return res.status(400).json({message: "address too long"})
        }

        const updateBrands = await brandsModel.findByIdAndUpdate(
            req.params.id, {
                name,
                slogan,
                address,
                isActive}, {new: true}
        );

        if (!updateBrands) {
            return res.status(404).json({message: "brand not found"})
        }

        return res.status(200).json({message: "brand updated"})

    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default brandsController;