const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3080;

app.use(express.json());
app.use(cors());

/** LOADERS **/

function loadJsonFile(filename) {
    const raw = fs.readFileSync(__dirname + `/../ressources/${filename}`, 'utf-8');
    return JSON.parse(raw);
}

/** KEYBOARD API **/

app.get('/keyboard', (req, res) => {
    try {
        const config = loadJsonFile('clavier.json');
        const {minRating, maxRating, minPrice, maxPrice, ...filters } = req.query;

        const keyboardConfig = config.filter(item =>
            Object.entries(filters).every(([key, value]) => item[key] == value)
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
        const keyboard = loadJsonFile('clavier.json').find(item => item.id.toString() === req.params.id.toString());

        if (!keyboard) {
            return res.status(404).json({ error: 'Keyboard not found' });
        }

        res.json(keyboard);
    } catch (error) {
        res.status(500).json({ error: `Failed to get keyboard ${req.params.id}` });
    }
});

app.post('/keyboard', (req, res) => {
    try {
        const config = loadJsonFile('clavier.json');
        const newKeyboard = req.body;

        const validation = validateFields(newKeyboard, 'keyboard');
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        const requiredFields = ['name', 'image_url', 'marque', 'type', 'switches', 'layout', 'wireless', 'rgb', 'hot_swappable', 'price', 'stock', 'description'];
        const missing = requiredFields.some(field => !newKeyboard[field]);
        if (missing) {
            return res.status(400).json({ error: 'Invalid keyboard data' });
        }

        const maxId = config.length > 0 ? Math.max(...config.map(item => Number(item.id))) : 0;
        newKeyboard.id = maxId + 1;
        newKeyboard.rating = newKeyboard.rating || null;


        config.push(newKeyboard);
        fs.writeFileSync(__dirname + '/../ressources/clavier.json', JSON.stringify(config, null, 4));
        res.status(201).json(newKeyboard);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create keyboard' });
    }
});

app.patch('/keyboard/:id', (req, res) => {
    try {
        const config = loadJsonFile('clavier.json');
        const keyboardIndex = config.findIndex(item => item.id.toString() === req.params.id.toString());
        if (keyboardIndex === -1) return res.status(404).json({ error: 'Keyboard not found' });

        const updatedKeyboard = { ...config[keyboardIndex], ...req.body };
        const validation = validateFields(req.body, 'keyboard', false);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        config[keyboardIndex] = updatedKeyboard;
        fs.writeFileSync(__dirname + '/../ressources/clavier.json', JSON.stringify(config, null, 4));
        res.json(updatedKeyboard);
    } catch (error) {
        res.status(500).json({ error: `Failed to update keyboard ${req.params.id}` });
    }
});

app.delete('/keyboard/:id', (req, res) => {
    try {
        const keyboard = loadJsonFile('clavier.json').find(item => item.id.toString() === req.params.id.toString());

        if (!keyboard) {
            return res.status(404).json({ error: 'Keyboard not found' });
        }

        const deletedKeyboard = config.splice(keyboardIndex, 1)[0];
        fs.writeFileSync(__dirname + '/../ressources/clavier.json', JSON.stringify(config, null, 4));
        res.status(200).json({ message: `Clavier supprimé avec succès`, keyboard: deletedKeyboard });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete keyboard ${req.params.id}` });
    }
});

/** KEYCAPS API **/

app.get('/keycaps', (req, res) => {
    try {
        const config = loadJsonFile('keycaps.json');
        const {minRating, maxRating, minPrice, maxPrice, ...filters } = req.query;

        const filtered = config.filter(item =>
            Object.entries(filters).every(([key, value]) => item[key] == value)
            && (minPrice ? item.price >= parseFloat(minPrice) : true)
            && (maxPrice ? item.price <= parseFloat(maxPrice) : true)
            && (minRating ? item.rating >= parseFloat(minRating) : true)
            && (maxRating ? item.rating <= parseFloat(maxRating) : true)
        );

        res.json(filtered);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load keycaps' });
    }
});

app.get('/keycaps/:id', (req, res) => {
    try {
        const config = loadJsonFile('keycaps.json');
        const keycaps = config.find(item => item.id.toString() === req.params.id.toString());

        if (!keycaps) {
            return res.status(404).json({ error: 'Keycaps not found' });
        }

        res.json(keycaps);
    } catch (error) {
        res.status(500).json({ error: `Failed to get keycaps ${req.params.id}` });
    }
});

app.post('/keycaps', (req, res) => {
    try {
        const config = loadJsonFile('keycaps.json');
        const newKeycaps = req.body;

        const validation = validateFields(newKeycaps, 'keycaps');
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        const requiredFields = ['name', 'image_url', 'profile', 'material', 'layout', 'shine_through', 'price', 'stock'];
        const missing = requiredFields.some(field => !newKeycaps[field] && newKeycaps[field] !== false);
        if (missing) {
            return res.status(400).json({ error: 'Invalid keycaps data' });
        }

        const maxId = config.length > 0 ? Math.max(...config.map(item => Number(item.id))) : 0;
        newKeycaps.id = maxId + 1;
        newKeycaps.rating = newKeycaps.rating || null;

        config.push(newKeycaps);
        fs.writeFileSync(__dirname + '/../ressources/keycaps.json', JSON.stringify(config, null, 4));
        res.status(201).json(newKeycaps);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create keycaps' });
    }
});

app.patch('/keycaps/:id', (req, res) => {
    try {
        const config = loadJsonFile('keycaps.json');
        const keycapsIndex = config.findIndex(item => item.id.toString() === req.params.id.toString());
        if (keycapsIndex === -1) return res.status(404).json({ error: 'Keycaps not found' });

        const updated = { ...config[keycapsIndex], ...req.body };
        const validation = validateFields(req.body, 'keycaps', false);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        config[keycapsIndex] = updated;
        fs.writeFileSync(__dirname + '/../ressources/keycaps.json', JSON.stringify(config, null, 4));
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: `Failed to update keycaps ${req.params.id}` });
    }
});

app.delete('/keycaps/:id', (req, res) => {
    try {
        const config = loadJsonFile('keycaps.json');
        const index = config.findIndex(item => item.id.toString() === req.params.id.toString());

        if (index === -1) {
            return res.status(404).json({ error: 'Keycaps not found' });
        }

        const deleted = config.splice(index, 1)[0];
        fs.writeFileSync(__dirname + '/../ressources/keycaps.json', JSON.stringify(config, null, 4));
        res.status(200).json({ message: `Keycaps supprimés avec succès`, keycaps: deleted });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete keycaps ${req.params.id}` });
    }
});

/** ORDER API **/

app.get('/order', (req, res) => {
    try {
        const orders = loadJsonFile('orders.json');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load orders' });
    }
});

app.post('/keycaps', (req, res) => {
    try {
        const orders = loadJsonFile('orders.json');
        const { idclient, cart } = req.body;
        if (!idclient || !cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ error: 'idclient et cart sont requis' });
        }
        const maxId = orders.length > 0 ? Math.max(...orders.map(o => Number(o.id))) : 0;
        const newOrder = {
            id: maxId + 1,
            idclient,
            cart,
            date: new Date().toISOString(),
            status: 'en attente'
        };
        orders.push(newOrder);
        fs.writeFileSync(__dirname + '/../ressources/orders.json', JSON.stringify(orders, null, 4));
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

app.patch('/order/:id', (req, res) => {
    try {
        const orders = loadJsonFile('orders.json');
        const orderIndex = orders.findIndex(o => o.id.toString() === req.params.id.toString());
        if (orderIndex === -1) return res.status(404).json({ error: 'Order not found' });
        const updatedOrder = { ...orders[orderIndex], ...req.body };
        orders[orderIndex] = updatedOrder;
        fs.writeFileSync(__dirname + '/../ressources/orders.json', JSON.stringify(orders, null, 4));
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});

app.delete('/order/:id', (req, res) => {
    try {
        const orders = loadJsonFile('orders.json');
        const orderIndex = orders.findIndex(o => o.id.toString() === req.params.id.toString());
        if (orderIndex === -1) {
            return res.status(404).json({ error: 'Order not found' });
        }
        const deletedOrder = orders.splice(orderIndex, 1)[0];
        fs.writeFileSync(__dirname + '/../ressources/orders.json', JSON.stringify(orders, null, 4));
        res.status(200).json({ message: 'Commande annulée', order: deletedOrder });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

/** VALIDATION **/

function validateFields(data, type, required = true) {
    const base = {
        name: 'string',
        image_url: 'string',
        layout: 'string',
        price: 'number',
        stock: 'number',
        rating: ['number', 'undefined', 'object']
    };

    const keyboardSchema = {
        ...base,
        marque: 'string',
        type: 'string',
        switches: 'string',
        wireless: 'boolean',
        rgb: 'boolean',
        hot_swappable: 'boolean',
        description: 'string'
    };

    const keycapsSchema = {
        ...base,
        profile: 'string',
        material: 'string',
        shine_through: 'boolean',
        colorway: 'string',
        description: 'string'
    };

    const schema = type === 'keyboard' ? keyboardSchema : keycapsSchema;

    for (const key in schema) {
        if (required && !(key in data)) {
            return { valid: false, error: `Le champ "${key}" est requis.` };
        }
        if (key in data) {
            if (Array.isArray(schema[key])) {
                if (!schema[key].includes(typeof data[key])) {
                    return { valid: false, error: `Le champ ${key} doit être de type ${schema[key].join('/')} (reçu: ${typeof data[key]})` };
                }
            } else {
                if (typeof data[key] !== schema[key]) {
                    return { valid: false, error: `Le champ ${key} doit être de type ${schema[key]} (reçu: ${typeof data[key]})` };
                }
            }
        }
    }

    return { valid: true };
}

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
