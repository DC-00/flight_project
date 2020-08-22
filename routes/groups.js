const express = require("express");
const groupsRouter = express.Router();
const { getAllGroups, getPublicGroups } = require("../database");

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

groupsRouter.get("/public", async (req, res) => {
  const groups = await getPublicGroups();

  res.send({
    groups,
  });
});

module.exports = groupsRouter;
