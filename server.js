const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/api/user-routes");
const thoughtRoutes = require("./routes/api/thought-routes");

const app = express();
const PORT = process.env.PORT || 3001;

// routes
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongoose database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("debug", true);

app.listen(PORT, () =>
  console.log(`Connected on localhost http://localhost:${PORT}`)
);
