const { Router } = require("express");

const routeGenero = Router();

routeGenero.get("/", (req, res) => {
  res.send("Estoy en la ruta de generos");
});

module.exports = routeGenero;
