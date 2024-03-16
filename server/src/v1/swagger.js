const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My Kindergarten API",
    version: "1.0.0",
    description: "A kingergarten API",
  },
  contact: {
    name: "Omar",
    email: "OmR_Work@hotmail.com",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/v1/routes/representantesRoutes.js", "./src/schemas/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

//SwaggerUi

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };
