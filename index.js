// DEPENDENCIAS Y CONFIG. INCIIAL
const express = require("express");
const { Pool } = require("pg");

const app = express()
app.use(express.json())

const puerto = process.env.puerto || 3000

// CONFIGURACION DE LA BASE DE DATOS Y CREAR TABLAS

const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
})

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS mensajes (
      id SERIAL PRIMARY KEY,
      contenido TEXT NOT NULL
    );
  `);
  console.log("Base de datos inicializada");
}

initDB()

// ENDPOINTS

app.get("/", (req,res) => {
    res.json({ mensaje: "Practica DevOps" })
})

app.post("/mensaje", async (req,res) => {
    const {contenido} = req.body
    await pool.query("INSERT INTO mensajes (contenido) VALUES ($1)", [contenido])
    res.json({ status: "guardado"})
})

app.get("/mensajes", async (req, res) => {
    const resultado = await pool.query("SELECT * FROM mensajes")
    res.json(resultado.rows)
})

app.listen(puerto, '0.0.0.0',() => {
    console.log('El servidor esta escuchando el puerto ' + puerto)
})