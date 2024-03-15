const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { errorHandlingAfterRoute } = require("./middlewares/error-handler.js");

const reprsentantesRoutes = require("./v1/routes/representantesRoutes.js");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger.js");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routing
app.use("/api/v1", reprsentantesRoutes);
app.get("/", (req, res) =>
  res.send(`Hello world 👋 \n
Swagger documentation at =>  <a href="${
    req.protocol + "://" + req.get("host") + "/api/v1/docs"
  }">Swagger</a>`)
);

//Middlewares
app.use(errorHandlingAfterRoute);

//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is listening on PORT #${PORT}`);
  V1SwaggerDocs(app, PORT);
});
