const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(express.json());

function loadJsonFile(){
    const raw = fs.readFileSync(__dirname + '/../ressources/clavier.json', 'utf-8');
    return JSON.parse(raw);
}

app.get('/keyboard', (req, res) => {
    try {
        const config = loadJsonFile();
        const {minRating, maxRating, minPrice, maxPrice, ...filters } = req.query;

        const keyboardConfig = config.filter(item =>
            Object.entries(filters).every(([key, value]) => item[key] === value)
            && (minPrice ? item.price >= parseFloat(minPrice) : true)
            && (maxPrice ? item.price <= parseFloat(maxPrice) : true)
            && (minRating ? item.rating >= parseFloat(minRating) : true)
            && (maxRating ? item.rating <= parseFloat(maxRating) : true)
        );

        res.json(keyboardConfig);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to load keyboard configuration' });
    }
});

app.get('/keyboard/:id', (req, res) => {
    try {
        const config = loadJsonFile();
        const keyboard = config.find(item => item.id === req.params.id);

        if (!keyboard) {
            return res.status(404).json({ error: 'Keyboard not found' });
        }

        res.json(keyboard);
    } catch (error) {
        res.status(500).json({ error: `Failed to get keyboard ${req.params.id}` });
    }
});

app.post('keyboard', (req, res) => {
    try {
        const config = loadJsonFile();
        const newKeyboard = req.body;

        if (!newKeyboard || !newKeyboard.id || !newKeyboard.name || !newKeyboard.price) {
            return res.status(400).json({ error: 'Invalid keyboard data' });
        } else {
            const maxId = config.length > 0 ? Math.max(...config.map(item => Number(item.id))) : 0;
            newKeyboard.id = maxId + 1;

            config.push(newKeyboard);

            fs.writeFileSync(__dirname + '/../ressources/clavier.json', JSON.stringify(config, null, 4));
            res.status(201).json(newKeyboard);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create keyboard' });
    }
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
