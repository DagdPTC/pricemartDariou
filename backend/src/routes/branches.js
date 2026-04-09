import express from "express"
import branchesController from "../controllers/branchesController.js"

//Router() nos ayudará a colocar los métodos
//que tendrá el endpoint
const router = express.Router()

router.route("/")
.get(branchesController.getBranches)
.post(branchesController.postBranches)

router.route("/:id")
.put(branchesController.putBranches)
.delete(branchesController.deleteBranches)

export default router;