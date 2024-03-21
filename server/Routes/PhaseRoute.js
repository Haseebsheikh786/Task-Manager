const express = require("express");
const {
  createPhase,
  getAllPhases,
  deletePhaseById,
  editPhase,
} = require("../controller/PhaseController");

const router = express.Router();
router.post("/", createPhase);
router.get("/", getAllPhases);
router.delete("/:id", deletePhaseById);
router.patch("/:id", editPhase);
module.exports = router;
