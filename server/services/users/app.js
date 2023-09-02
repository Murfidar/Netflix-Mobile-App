if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const router = require("./routes/index");
const { connect } = require("./config/mongoConnection");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

connect().then((db) => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
