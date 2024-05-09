const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { errorHandlingAfterRoute } = require("./middlewares/error-handler.js");

const reprsentantesRoutes = require("./v1/routes/representantesRoutes.js");

let envFile = `.env.${process.env.NODE_ENV}`;

dotenv.config({
  path: path.resolve(__dirname, envFile),
});

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

module.exports = { app };
