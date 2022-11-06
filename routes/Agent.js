const express = require("express");
const agentRouter = express.Router();

const Agent = require("../models/Agent");


agentRouter.post("/editagent", (req, res) => {
    console.log(req.body.agent)
    Agent.findByIdAndUpdate(req.body.AID, req.body.agent, (err) => {
      if (err) {
        console.log("Agent failed to update");
        res.status(500).json({
          message: { msgBody: "Agent failed to update", msgError: true },
        });
      } else {
        console.log("Agent updated successfully");
      }
    });
  });

  agentRouter.post("/getagentbyid", (req, res) => {
    console.log("Fetching Agent");
    Agent.findById(req.body._id).exec((err, document) => {
      if (err) {
        console.log("Agent failed to fetch");
        res.status(500).json({
          message: { msgBody: "Agent failed to fetch", msgError: true },
        });
      } else {
        console.log("Agent fetched successfully");
        res.status(200).json({ agent: document });
      }
    });
  });
agentRouter.get("/agents", (req, res) => {
  Agent.find().exec((err, document) => {
    if (err) {
      console.log("Agents failed to fetch");
      res.status(500).json({
        message: { msgBody: "Agents failed to fetch", msgError: true },
      });
    } else {
      console.log("Orders fetched successfully");
      res.status(200).json({ agents: document });
    }
  });
});

  

module.exports = agentRouter;
