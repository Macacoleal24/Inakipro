const sqlite3 = require('sqlite3').verbose();

// Crear conexión a la base de datos
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear tabla de usuarios si no existe (incluyendo el correo)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            apellidoPaterno TEXT NOT NULL,
            apellidoMaterno TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            fechaNacimiento TEXT NOT NULL,
            password TEXT NOT NULL
        );
    `);
});

module.exports = db;
