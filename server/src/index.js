const express = require("express");

const app = express();

//Middlewares

app.use(express.json());
app.use(cors());

//Routing



//Server

const PORT = 3308;

app.listen(PORT,()=>`The server is listening at PORT #${PORT}`)