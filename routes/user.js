const express = require("express");
const validateData = require("../middleware/validate.js");
const router = express.Router();
const { getUser, getIdUser, postdetails, updateDetails } = require("../controllers/user.js");

router.get("/fetch", getUser);
router.get("/:id", getIdUser);
router.post("/enterdetails", validateData, postdetails);
router.patch("/:id", updateDetails);

export default router;