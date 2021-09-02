import express from "express";
import PollController from "../controllers/poll.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new PollController();
  const response = await controller.getPolls();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new PollController();
  req.body.user = req.user;
  req.body.closed_at = Date();
  const poll = await controller.createPoll(req.body);
  return res.send(poll);
});

router.get("/:id", async (req, res) => {
  const controller = new PollController();
  const response = await controller.getPoll(req.params.id);
  if (!response) res.status(404).send({ message: "No poll found" });
  return res.send(response);
});

export default router;
