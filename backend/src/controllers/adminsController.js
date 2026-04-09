const adminsController = {};

import adminsModel from "../models/admins.js"

//SELECT
adminsController.getAdmin = async (req, res) => {
    try{
        const admins = await adminsModel.find()
        return res.status(200).json(admins)
    } catch (error) {
        console.log("Error" + error)
        return res.tatus(500).json({message: "Internal server error"})
    }
}

//INSERT
adminsController.insertAdmin = async (req, res) => {
    try{
        let {name, email, password, isVerified} = req.body;

        //Validaciones
        name = name?.trim();
        email = email?.trim();
        password = password?.trim(); 

        //Validaciones de datos null
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }

        if (name.length < 2) {
            return res.status(400).json({message: "name too short"})
        }

        if (password.length < 8)  {
            return res.status(400).json({message: "password too short"})
        }

        const newAdmin = new adminsModel({name, email, password, isVerified})
        await newAdmin.save()

        return res.status(201).json({message: "Admin saved"})
    } catch (error) { 
        console.log("Error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};


//DELETE
adminsController.deleteAdmin = async (req, res) => {
    try {
        const deleteAdmin = await adminsModel.findByIdAndDelete(req.params.id)

        if (!deleteAdmin) {
            return res.status(404).json({message: "admin not found"})
        }

        return res.status(200).json({message: "admin deleted"})
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
}

//UPDATE
adminsController.updateAdmin = async (req, res) => {
    try {
        let {name, email, password, isVerified} = req.body;

        //Validaciones
        name = name?.trim();
        email = email?.trim();
        password = password?.trim(); 

        //Validaciones de datos null
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }

        if (name.length < 2) {
            return res.status(400).json({message: "name too short"})
        }

        if (password.length < 8)  {
            return res.status(400).json({message: "password too short"})
        }

        const updateAdmin = await adminsModel.findByIdAndUpdate(
            req.params.id, {
                name,
                email,
                password,
                isVerified}, {new: true}
        );

        if (!updateAdmin) {
            return res.status(404).json({message: "admin not found"})
        }

        return res.status(200).json({message: "admin updated"})

    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default adminsController;
