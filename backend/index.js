const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// Configuration de la connexion MySQL
let db = null;
let tryCount = 0;

const connectToDatabase = () => {
    if (tryCount >= 5) {
        console.error('Impossible de se connecter à la base de données MySQL');
        process.exit(1);
    }

    console.log('Tentative de connexion à la base de données MySQL');
    console.log('Host:', process.env.MYSQL_HOST);
    console.log('User:', process.env.MYSQL_USER);
    console.log('Database:', process.env.MYSQL_DATABASE);

    try {
        db = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
    } catch (err) {
        console.error('Erreur lors de la connexion à MySQL :', err);
        tryCount++;
        setTimeout(connectToDatabase, 2000);
        return
    }
};

connectToDatabase();

// Connexion à la base de données
try {
    db.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à MySQL :', err);
            tryCount++;
            setTimeout(connectToDatabase, 2000);
            return;
        }
        console.log('Connecté à la base de données MySQL');

        // Créer la table `blogs` si elle n'existe pas déjà
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blogs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            tags varchar(255) NOT NULL
        )
    `;

        db.query(createTableQuery, (err, result) => {
            if (err) {
                console.error('Erreur lors de la création de la table :', err);
                return;
            }
            console.log('Table `blogs` prête à l\'emploi');
        });
    });
} catch (err) {
    console.error('Erreur lors de la connexion à MySQL :', err);
    tryCount++;
    setTimeout(connectToDatabase, 2000);
    return;
}


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
app.get('/blogs/:id', (req, res) => {
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
app.post('/blogs', (req, res) => {
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
app.put('/blogs/:id', (req, res) => {
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
app.delete('/blogs/:id', (req, res) => {
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
