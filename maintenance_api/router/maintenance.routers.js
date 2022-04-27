const { route } = require("express/lib/application");

module.exports = app => {

  const maintenance = require("../controllers/maintenance.controller");
  const express = require("express");
  const router = express.Router();

  router.post("/maintenance", maintenance.create);

  router.get("/maintenance",maintenance.findAll)

  router.get("/maintenance/:id",maintenance.findOne)

  router.put("/maintenance/:id", maintenance.update)

  router.delete("/maintenance/:id",maintenance.delete)

  router.delete("/maintenance",maintenance.deleteAll)

  router.get("/fixed", maintenance.findAllFixed)

  app.use("/api", router);
};

