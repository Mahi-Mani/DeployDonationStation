const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/reactApiRoutes");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes/reactApiRoutes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
app.use("/api", apiRoutes);
// app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
