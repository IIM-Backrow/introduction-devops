const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: 'database', // Le nom du service MySQL défini dans docker-compose
    user: 'root',
    password: 'root',
    database: 'backrow'
});

// Connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});


// Récupérer tous les articles du blog
app.get('/blogs', (req, res) => {
    const query = "SELECT * FROM `blogs`";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// Récupérer un article spécifique par son ID
app.get('/blog/:id', (req, res) => {
    const postId = req.params.id;
    const query = 'SELECT * FROM blogs WHERE id = ?';
    db.query(query, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        res.json(result[0]);
    });
});

// Créer un nouvel article
app.post('/createBlog', (req, res) => {
    const { name, content, tags } = req.body;
    const query = "INSERT INTO `blogs` (`name`, `content`, `tags`) VALUES (?, ?, ?)";
    db.query(query, [name, content, JSON.stringify(tags)], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ id: result.insertId, name, content, tags });
    });
});

// Mettre à jour un article existant
app.put('/updateBlog/:id', (req, res) => {
    const postId = req.params.id;
    const { name, content, tags } = req.body;
    const query = 'UPDATE blogs SET name = ?, content = ?, tags = ? WHERE id = ?';
    db.query(query, [name, content, JSON.stringify(tags), postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        res.json({ message: 'Article mis à jour' });
    });
});

// Supprimer un article
app.delete('/deleteBlog/:id', (req, res) => {
    const postId = req.params.id;
    const query = 'DELETE FROM blogs WHERE id = ?';
    db.query(query, [postId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }
        res.json({ message: 'Article supprimé' });
    });
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});