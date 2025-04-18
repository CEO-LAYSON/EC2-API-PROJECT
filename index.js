import dotenv from "dotenv";
import express from "express";
import pkg from "pg";
import cors from "cors";

// Load environment variables
dotenv.config();

// Check required environment variables
["PGUSER", "PGHOST", "PGDATABASE", "PGPASSWORD", "PGPORT"].forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Warning: ${key} is not defined in .env file`);
  }
});

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 5005;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// GET /students
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("SELECT name, program FROM students");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /subjects
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

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
