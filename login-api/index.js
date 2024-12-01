// index.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database'); // Conexión a SQLite

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta de registro
app.post('/register', (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, correo, fechaNacimiento, password } = req.body;

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !fechaNacimiento || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const query = `
        INSERT INTO users (nombre, apellidoPaterno, apellidoMaterno, correo, fechaNacimiento, password)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [nombre, apellidoPaterno, apellidoMaterno, correo, fechaNacimiento, password], function (err) {
        if (err) {
            console.error('Error al registrar el usuario:', err.message);
            return res.status(500).json({ message: 'Error al registrar el usuario. Es posible que el correo ya esté registrado.' });
        }

        res.status(201).json({ message: 'Usuario registrado con éxito.', userId: this.lastID });
    });
});

// Ruta de login
app.post('/login', (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    const query = `
        SELECT * FROM users WHERE correo = ? AND password = ?
    `;

    db.get(query, [correo, password], (err, user) => {
        if (err) {
            console.error('Error al buscar el usuario:', err.message);
            return res.status(500).json({ message: 'Error al iniciar sesión.' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
