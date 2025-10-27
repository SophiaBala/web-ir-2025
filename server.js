const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('SQLite error:', err.message);
    else console.log('SQLite connected');
});

db.run(`
CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    listeners INT
)
`);


///////////////////API

app.get('/api/songs', (req, res) => {
    db.all('SELECT * FROM songs', [], (err, rows) => {
        if (err) {
            console.error('DB error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.post('/api/songs', (req, res) => {
    const { name, listeners } = req.body;

    if (!name || typeof listeners !== 'number' || listeners < 0) {
        return res.status(400).json({ error: 'Invalid name or listeners number' });
    }

    db.run('INSERT INTO songs (name, listeners) VALUES (?, ?)', [name, listeners], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});


app.put('/api/songs/:id', (req, res) => {
    const { id } = req.params;
    const { name, listeners } = req.body;

    if (!name || typeof listeners !== 'number' || listeners < 0) {
        return res.status(400).json({ error: 'Invalid name or listeners number' });
    }

    db.run(
        'UPDATE songs SET name = ?, listeners = ? WHERE id = ?',
        [name, listeners, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
});

app.delete('/api/songs/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM songs WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});





app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
