if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 4002;

const router = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

