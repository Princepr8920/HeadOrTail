const express = require("express");
const routes = express.Router();
const { contact } = require("./controllers/contact");
 
routes.post("/contact", contact);

module.exports = routes;
