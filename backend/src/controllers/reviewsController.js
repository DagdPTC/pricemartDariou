const reviewController = {};

import reviewModel from "../models/reviews.js";

//SELECT
reviewController.getReview = async (req, res) => {
  const employees = await reviewModel.find();
  res.json(employees);
};

//INSERT
reviewController.insertReview = async (req, res) => {
  const { idEmployee, idProducts, rating, comment} =
    req.body;

  const newReview = new reviewModel({
    idEmployee,
    idProducts,
    rating,
    comment
  });

  await newReview.save();
  res.json({ message: "Review saved" });
};

//ELIMINAR
reviewController.deleteReview = async (req, res) => {
  await reviewModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};

//UPDATE
reviewController.updateReview = async (req, res) => {
  // Solicitamos los nuevo valores
  const { idEmployee, idProducts, rating, comment} =
    req.body;

  await reviewModel.findByIdAndUpdate(
    req.params.id,
    {
      idEmployee,
      idProducts,
      rating,
      comment
    },
    { new: true },
  );

  res.json({ message: "Review updated" });
};

export default reviewController;





