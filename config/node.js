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

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
