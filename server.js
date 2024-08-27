const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5003;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// In-memory database (replace this with a real database like MongoDB, MySQL, etc.)
let users = [];
let userCounter = 0; // Counter to generate unique numeric IDs

// Function to generate a new user ID
function generateUserId() {
  userCounter += 1; // Increment the counter
  const userId = `78612${String(userCounter).padStart(3, "0")}`; // Format as papers00001
  return userId;
}

// Endpoint to handle form submission
app.post("/api/saveUserData", (req, res) => {
  const {
    wosEmail,
    wosProfileLink,
    googleScholarEmail,
    googleScholarProfileLink
  } = req.body;

  // Generate a unique alphanumeric user ID
  const userId = generateUserId();

  // Create a user object
  const newUser = {
    userId,
    wosEmail: wosEmail || null,
    wosProfileLink: wosProfileLink || null,
    googleScholarEmail: googleScholarEmail || null,
    googleScholarProfileLink: googleScholarProfileLink || null,
  };

  // Store the user in the in-memory database (or save to a real database)
  users.push(newUser);

  console.log("User saved:", newUser); // Log user data for debugging

  res.json({ success: true, userId });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});