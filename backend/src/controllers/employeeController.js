const employeeController = {};

import employeeModel from "../models/employee.js";

//SELECT
employeeController.getEmployee = async (req, res) => {
  const employees = await employeeModel.find();
  res.json(employees);
};

//INSERT
employeeController.insertEmployee = async (req, res) => {
  const { name, lastName, salary, DUI, phone, email, password, idBranches } =
    req.body;

  const newEmployee = new employeeModel({
    name,
    lastName,
    salary,
    DUI,
    phone,
    email,
    password,
    idBranches,
  });

  await newEmployee.save();
  res.json({ message: "Employee saved" });
};

//ELIMINAR
employeeController.deleteEmployee = async (req, res) => {
  await employeeModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Emloyee deleted" });
};

//UPDATE
employeeController.updateEmployee = async (req, res) => {
  // Solicitamos los nuevo valores
  const { name, lastName, salary, DUI, phone, email, password, idBranches } =
    req.body;

  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      lastName,
      salary,
      DUI,
      phone,
      email,
      password,
      idBranches,
    },
    { new: true },
  );

  res.json({ message: "Employee updated" });
};

export default employeeController;
