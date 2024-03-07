const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { errorHandlingAfterRoute } = require("./middlewares/error-handler.js");

const reprsentantesRoutes = require("./v1/routes/representantesRoutes.js");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routing
app.use("/api/v1", reprsentantesRoutes);
app.get("/", (req, res) => res.send("Hello world 👋"));

//Middlewares
app.use(errorHandlingAfterRoute);

//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is listening at PORT #${PORT}`));
