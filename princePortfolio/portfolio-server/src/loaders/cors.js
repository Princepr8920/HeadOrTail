let cors = require("cors");

module.exports = cors({
  origin: "https://prince8920-portfolio.herokuapp.com", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
});
