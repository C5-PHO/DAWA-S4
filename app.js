const express = require("express");
const app = express();
const path = require("path");

// Configurar el motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, "public")));

// Procesar los datos enviados desde formularios HTML
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

// Mostrar una vista personalizada para las rutas que no existen
app.use((req, res) => {
  res.status(404).render("notFound", {
    title: "Página no encontrada",
    url: req.originalUrl,
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
}

module.exports = app;
