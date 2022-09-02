import express from "express";
import { validateData } from "../middleware/validate.js";
import { getUser, getIdUser, postdetails, updateDetails } from "../controllers/user.js";

const router = express.Router();

router.get("/fetch", getUser);
router.get("/:id", getIdUser);
router.post("/enterdetails", validateData, postdetails); // using middlware to verify data
router.patch("/:id", updateDetails);

export default router;