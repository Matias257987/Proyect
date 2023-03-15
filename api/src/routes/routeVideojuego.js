const { Router } = require("express");

const routeVideojuego = Router();

routeVideojuego.get("/", (req, res) => {
  res.send("Estoy en la ruta de videojuegos");
});

module.exports = routeVideojuego;
