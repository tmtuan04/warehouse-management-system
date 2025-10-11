import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Supabase yêu cầu SSL
    },
});

pool.connect()
    .then(() => {
        console.log("Connected to Supabase PostgreSQL successfully!");
    })
    .catch((err) => {
        console.error(" Database connection failed:", err.message);
    });

export default pool;