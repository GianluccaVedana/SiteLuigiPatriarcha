import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'luigi_cup',
  user: process.env.DB_USER || 'luigi_cup',
  password: process.env.DB_PASSWORD || 'LuigiCup2026@PB',
})

export default pool

export async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(200) UNIQUE NOT NULL,
      password_hash VARCHAR(200) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS teams (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      team_name VARCHAR(200) NOT NULL,
      city VARCHAR(200) NOT NULL,
      state VARCHAR(2) DEFAULT 'PR',
      category VARCHAR(50) NOT NULL,
      responsible VARCHAR(200) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(200) NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      logo_url VARCHAR(500),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      team_id INTEGER REFERENCES teams(id) ON DELETE CASCADE,
      name VARCHAR(200) NOT NULL,
      number INTEGER,
      position VARCHAR(50),
      birth_date VARCHAR(20),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)
}
