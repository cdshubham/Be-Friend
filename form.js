const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Create an Express application
const app = express();

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://localhost/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB schema and model
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", userSchema);

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

// Handle form submission
app.post("/submit", (req, res) => {
  const { name, email } = req.body;

  // Create a new User document and save it to the database
  const newUser = new User({ name, email });
  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.send("Error occurred while saving to MongoDB.");
    } else {
      res.send("Data has been saved to MongoDB successfully.");
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
