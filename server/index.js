// server/index.js
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt"; // for hashing passwords
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // change if your MySQL user is different
  password: "VB@mysql",        // put your MySQL password
  database: "appsys"   // your database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// Signup route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (result.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: "Error creating user" });
        res.json({ message: "User registered successfully" });
      });
    });
  } catch{
    res.status(500).json({ error: "Server error"});
  }
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
