//Creo un array de métodos
const branchesController = {};

//Import del Schema de la coleccion
//que vammos a ocupar 

import branchesModel from "../models/branches.js"

//SELECT

branchesController.getBranches = async (req, res) => {
    const branches = await branchesModel.find()
    res.json(branches)
}

//INSERT
branchesController.postBranches = async (req, res) => {
    // #1 Solicitamos los campos
    const {name, address, schedule, isActive} = req.body;

    const newBranches = new branchesModel({name, address, schedule, isActive})

    await newBranches.save()

    res.json({message: "Branch save"})
}

//ELIMINAR
branchesController.deleteBranches = async (req, res) => {
    await branchesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Branch deleted"})
}

//UPDATE
branchesController.putBranches = async (req, res) => {
    // Solicitamos los nuevo valores
    const {name, address, schedule, isActive} = req.body;
    await branchesModel.findByIdAndUpdate(req.params.id, {
        name,
        address,
        schedule,
        isActive}, {new: true})

        res.json ({message: "Branch updated"})
};

export default branchesController;