const clientsController = {};

import clientsModel from "../models/clients.js";

//SELECT
clientsController.getClient = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    return res.status(200).json(clients);
  } catch (error) {
    console.log("Error" + error);
    return res.tatus(500).json({ message: "Internal server error" });
  }
};


//DELETE
clientsController.deleteClient = async (req, res) => {
  try {
    const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);

    if (!deleteClient) {
      return res.status(404).json({ message: "client not found" });
    }

    return res.status(200).json({ message: "client deleted" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
clientsController.updateClient = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      birthdate,
      status,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    //Validaciones
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();
    birthdate = birthdate?.trim();

    //Validaciones de datos null
    if (!name || !email || !password || !birthdate || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (name.length < 2) {
      return res.status(400).json({ message: "name too short" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "password too short" });
    }

    if (birthdate > "2026-03-20") {
      return res.status(400).json({ message: "date invalid" });
    }

    const updateClient = await clientsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
        birthdate,
        status,
        isVerified,
        loginAttemps,
        timeOut,
      },
      { new: true },
    );

    if (!updateClient) {
      return res.status(404).json({ message: "client not found" });
    }

    return res.status(200).json({ message: "client updated" });
  } catch (error) {
    console.log("Error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default clientsController;
 