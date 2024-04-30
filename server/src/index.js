const { app } = require("./app");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger.js");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on PORT #${PORT}`);
  V1SwaggerDocs(app, PORT);
});
