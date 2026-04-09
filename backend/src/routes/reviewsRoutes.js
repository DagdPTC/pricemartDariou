import express from "express"
import reviewsController from "../controllers/reviewsController.js"

const router = express.Router()

router.route("/")
.get(reviewsController.getReview)
.post(reviewsController.insertReview)

router.route("/:id")
.put(reviewsController.updateReview)
.delete(reviewsController.deleteReview)

export default router;