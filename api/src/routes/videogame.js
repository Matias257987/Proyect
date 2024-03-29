const { Router } = require("express");
require("dotenv").config();
const { videogame } = require("../routes/controllers/index.js");
const { Videogame, Genres } = require("../db.js");

const router = Router();

router.get("/:idVideogame", async (req, res, next) => {
  const { idVideogame } = req.params; //el id me llega por params
  let data = await videogame(idVideogame);

  try {
    //const getById = await data.(i => i.id == idVideogame)
    data
      ? res.send(data)
      : res
          .status(404)
          .send("El id ingresado no coincide con un videojuego en particular");
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  const { name, image, genres, released, rating, platforms, description } =
    req.body;
  //la accion de crear una nueva instancia es asincrona, como manejo errores? con try y catch
  try {
    let newVideogame = await Videogame.create({
      //le paso al create el objeto con todos los atributos que quiero que tenga mi nuevo videojuego
      name,
      image,
      released,
      rating,
      platforms,
      description,
    });
    const relacion = await Genres.findAll({
      //en generos, buscame todos aquellos
      where: {
        //donde
        name: genres,
      },
    });
    await newVideogame.addGenres(relacion); //a mi juego creado, le agrego algun genero
    res.json(newVideogame);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
