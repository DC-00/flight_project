const express = require("express");
const groupsRouter = express.Router();
const { getAllGroups } = require("../database");

groupsRouter.use((req, res, next) => {
  next();
});

groupsRouter.get("/", async (req, res) => {
  try {
    const groups = await getAllGroups();
    res.send({
      groups,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

groupsRouter.get("/", async (req, res) => {
  const groups = await getAllGroups();

  res.send({
    groups,
  });
});

module.exports = groupsRouter;
