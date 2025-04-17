import dotenv from "dotenv";
import express from "express";
import pkg from "pg";
import cors from "cors";

// Load environment variables
dotenv.config();

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 5001;

// Database connection
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.use(cors());

// Initial route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the UDOM API! Use /students or /subjects to fetch data."
  );
});

// Endpoint 1: /students
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, program FROM students");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint 2: /subjects
app.get("/subjects", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT name, year FROM subjects ORDER BY year"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
