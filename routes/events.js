const express = require("express");
const eventsRouter = express.Router();
const {
  getAllEvents,
  getPublicEvents,
  getEventById,
  getTodos,
} = require("../database");

eventsRouter.use((req, res, next) => {
  next();
});

eventsRouter.get("/", async (req, res) => {
  try {
    const events = await getAllEvents();
    res.send({
      events,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

eventsRouter.get("/public", async (req, res) => {
  const events = await getPublicEvents();

  res.send({
    events,
  });
});

eventsRouter.get("/todos/:eventId", async (req, res, next) => {
  try {
    const event = await getEventById(req.params.eventId);
    const todos = await getTodos(event.id);
    res.send({
      todos,
    });
  } catch ({ name, message }) {
    next({ name: "TodoError", message: "Error getting todos" });
  }
});

module.exports = eventsRouter;
