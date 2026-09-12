// Registros almacenados en memoria mientras el servidor está en ejecución.
const games = [
  {
    nombre: "The Legend of Zelda: Breath of the Wild",
    genero: "Aventura",
    plataforma: "Nintendo Switch",
    lanzamiento: 2017,
    puntuacion: 10,
  },
];

const index = (req, res) => {
  res.render("games", { title: "Videojuegos populares", games });
};

const store = (req, res) => {
  const { nombre, genero, plataforma, lanzamiento, puntuacion } = req.body;

  games.push({ nombre, genero, plataforma, lanzamiento, puntuacion });
  res.redirect("/games");
};

module.exports = { index, store };
