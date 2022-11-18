const express = require("express"),
  app = express(),
  logger = require("morgan"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  corsOptions = require("./config/corsOptions"),
  Credentials = require("./middleware/credentials"),
  routes = require("./routes"),
  rateLimiter = require("./middleware/limiter"),
  { validationRules, validator } = require("./middleware/validator"),
  helmet = require("helmet"),
  path =require("path")
app.use(helmet());

app.use(logger("dev"));
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"../public")))

mongoose.connect(
  process.env.DB_CONN,
  { useNewUrlparser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("Database connected successfully 🧠");
  }
);

app.use(Credentials);
app.use(cors(corsOptions));
app.use(express.json());

app.use("/contact", validationRules, validator);
app.use(
  "/contact",
  rateLimiter(
    1440,
    3,
    {
      status: 429,
      success: false,
      message: "You have reached your daily limit to send message ❗",
    },
    429
  )
);
app.use(
  rateLimiter(
    1440,
    50,
    {
      status: 429,
      success: false,
      message: "You have reached your daily limit.",
    },
    429
  )
);

app.use(routes);

 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(process.env.PORT || 4000, (err) => {
  if (err) return console.error(err);
  console.log(`Server started successfully on PORT : ${process.env.PORT} ✔`);
});
