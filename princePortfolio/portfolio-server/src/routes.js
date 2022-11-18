const express = require("express");
const routes = express.Router();
const { contact } = require("./controllers/contact");
 
routes.get("/", (req, res) => {
  res.sendStatus(200);
});

routes.post("/contact", contact);

module.exports = routes;
