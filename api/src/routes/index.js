const { Router } = require("express");

const videojuegos = require("./routeVideojuego");
const generos = require("./routeGenero");

const router = Router();

router.use("/", videojuegos);
router.use("/", generos);

module.exports = router;
