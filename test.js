const assert = require("node:assert/strict");
const app = require("./app");

const server = app.listen(0, async () => {
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    for (const path of ["/", "/about", "/contact", "/admin", "/games"]) {
      const response = await fetch(`${baseUrl}${path}`);
      assert.equal(response.status, 200, `${path} debe responder con 200`);
    }

    const contactResponse = await fetch(`${baseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        nombre: "Prueba",
        email: "prueba@example.com",
        mensaje: "Mensaje de prueba",
      }),
      redirect: "manual",
    });
    assert.equal(contactResponse.status, 302);
    assert.equal(contactResponse.headers.get("location"), "/admin");

    const adminHtml = await (await fetch(`${baseUrl}/admin`)).text();
    assert.match(adminHtml, /prueba@example\.com/);

    const gameResponse = await fetch(`${baseUrl}/games`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        nombre: "Portal 2",
        genero: "Puzles",
        plataforma: "PC",
        lanzamiento: "2011",
        puntuacion: "9.5",
      }),
      redirect: "manual",
    });
    assert.equal(gameResponse.status, 302);
    assert.equal(gameResponse.headers.get("location"), "/games");

    const gamesHtml = await (await fetch(`${baseUrl}/games`)).text();
    assert.match(gamesHtml, /Portal 2/);

    const notFound = await fetch(`${baseUrl}/ruta-inexistente`);
    assert.equal(notFound.status, 404);
    assert.match(await notFound.text(), /ruta-inexistente/);

    console.log("Todas las rutas y formularios funcionan correctamente.");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
