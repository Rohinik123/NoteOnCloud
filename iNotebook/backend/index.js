const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

//--------------Available Routes----------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB Atlas");
  })
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
