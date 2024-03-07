const { Router } = require("express");
const {
  getRepresentante,
  getRepresentantes,
  postRepresentante,
  putRepresentante,
  deleteRepresentante,
} = require("../../controllers/representantesController");

const routes = Router();

routes.get("/representantes", getRepresentantes);
routes.get("/representantes/:id", getRepresentante);
routes.post("/representantes/", postRepresentante);
routes.put("/representantes/:id", putRepresentante);
routes.delete("/representantes/", deleteRepresentante);

module.exports = routes;
