const express = require("express");
// const crossDomain = require("./middleware/crossDomain");
const mongoose = require("mongoose");
const cors = require('cors');
// Routes
const authRoute = require("./routes/auth");
const campaignRoute = require("./routes/campaign");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = "mongodb://localhost:27017/hive";

// Database connection
const startDb = async () => {
  try {
    await mongoose.connect(dbConnect, { useNewUrlParser: true });
    console.log("connected to db");
  } catch (e) {
    console.log(e.message);
  }
};
startDb();

// app.get("/", (req, res) => res.send("This is Hive!"));
// app.use(crossDomain);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/campaign", campaignRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
