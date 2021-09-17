const express = require("express");
const router = express.Router();
const personRouter = require("./person");
const authRouter = require("./auth");

router.get("/", (req, res) => {
  res.json("Conectado");
});

module.exports = {
  router,
  personRouter,
  authRouter,
};
