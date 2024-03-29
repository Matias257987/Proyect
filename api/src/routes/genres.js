const { default: axios } = require("axios");
const { Router } = require("express");
const { Genres } = require("../db.js");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const respuesta = await axios.get(
      `https://api.rawg.io/api/genres?key=6bcf7f7f25be4251b01417ff0c30ad7a`
    );
    const genresApi = await respuesta.data.results.map((g) => g.name);
    //console.log('estos son los generos: ', genresApi)

    genresApi.map((e) =>
      Genres.findOrCreate({
        //lo uso para guardar los generos que me traje de la API en la base de datos
        where: { name: e }, //
      })
    );

    const allGenres = await Genres.findAll(); //me traigo todos los generos que guarde en mi db
    res.json(allGenres);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
