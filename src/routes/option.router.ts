import express from "express";
import OptionController from "../controllers/option.controller";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const controller = new OptionController();
  try {
    controller.castVote(req.params.id);
  } catch (error) {
    return res.status(500).send({ message: "Error." });
  }
  return res.send({ message: "You've casted your vote successfully." });
});

export default router;
