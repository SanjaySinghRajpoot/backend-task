import express from "express";
import { validateData } from "../middleware/validate.js";
const router = express.Router();
import { getUser, getIdUser, postdetails, updateDetails } from "../controllers/user.js";

router.get("/fetch", getUser);
router.get("/:id", getIdUser);
router.post("/enterdetails", validateData, postdetails);
router.patch("/:id", updateDetails);

export default router;