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
        const keyboard = config.find(item => item.id.toString() === req.params.id.toString());

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
        const config = loadJsonFile();
        const newKeyboard = req.body;

        const validation = validateFields(newKeyboard);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        const requiredFields = ['name', 'marque', 'type', 'switches', 'layout', 'wireless', 'rgb', 'hot_swappable', 'price', 'stock'];
        const missing = requiredFields.some(field => !newKeyboard[field]);
        if (!newKeyboard || missing) {
            return res.status(400).json({ error: 'Invalid keyboard data' });
        } else {
            const maxId = config.length > 0 ? Math.max(...config.map(item => Number(item.id))) : 0;
            newKeyboard.id = maxId + 1;
            newKeyboard.rating = newKeyboard.rating || null;

            const { id, ...rest } = newKeyboard;
            const keyboardToSave = { id, ...rest };

            config.push(keyboardToSave);

            fs.writeFileSync(__dirname + '/../ressources/clavier.json', JSON.stringify(config, null, 4));
            res.status(201).json(newKeyboard);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create keyboard' });
    }
});

app.patch('/keyboard/:id', (req, res) => {
    try {
        const config = loadJsonFile();
        const keyboardIndex = config.findIndex(item => item.id.toString() === req.params.id.toString());

        const updatedKeyboard = { ...config[keyboardIndex], ...req.body};
        config[keyboardIndex] = updatedKeyboard;

        const validation = validateFields(req.body, false);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        fs.writeFileSync(__dirname + '/../ressources/clavier.json', JSON.stringify(config, null, 4));
        res.json(updatedKeyboard);
    } catch (error) {
        res.status(500).json({ error: `Failed to update keyboard ${req.params.id}` });
    }
});

app.delete('/keyboard/:id', (req, res) => {
    try {
        const config = loadJsonFile();
        const keyboardIndex = config.findIndex(item => item.id.toString() === req.params.id.toString());

        if (keyboardIndex === -1) {
            return res.status(404).json({ error: 'Keyboard not found' });
        }

        const deletedKeyboard = config.splice(keyboardIndex, 1)[0];
        fs.writeFileSync(__dirname + '/../ressources/clavier.json', JSON.stringify(config, null, 4));
        res.status(200).json({ message: `Clavier supprimé avec succès`, keyboard: deletedKeyboard });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete keyboard ${req.params.id}` });
    }
});

app.get('/marques', (req, res) => {
    try {
        const config = loadJsonFile();
        const marques = [...new Set(config.map(item => item.marque))].sort();
        res.json(marques);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load brands' });
    }
});

app.post('/order', (req, res) => {
    try {
        const order = req.body;

        if (!order || !Array.isArray(order.items) || order.items.length === 0) {
            return res.status(400).json({ error: 'Invalid order data' });
        }

        const keyboards = loadJsonFile();
        let totalPrice = 0;
        const orderDetails = order.items.map(item => {
            if (!item.id || !item.quantity) {
                throw new Error('Invalid item in order');
            }
            const keyboard = keyboards.find(k => k.id.toString() === item.id.toString());
            if (!keyboard) {
                throw new Error(`Keyboard with id ${item.id} not found`);
            }
            totalPrice += keyboard.price * item.quantity;
            return {
                id: keyboard.id,
                name: keyboard.name,
                quantity: item.quantity,
                price: keyboard.price
            };
        });

        const ordersPath = __dirname + '/../ressources/orders.json';
        let orders = [];
        if (fs.existsSync(ordersPath)) {
            orders = JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
        }

        const newOrder = {
            id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
            items: orderDetails,
            totalPrice,
            status: "en attente",
            date: new Date().toISOString()
        };

        orders.push(newOrder);
        fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 4));

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: `Failed to place order: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});

function validateFields(keyboard, required = true) {
    const schema = {
        name: 'string',
        marque: 'string',
        type: 'string',
        switches: 'string',
        layout: 'string',
        wireless: 'boolean',
        rgb: 'boolean',
        hot_swappable: 'boolean',
        price: 'number',
        stock: 'number',
        rating: ['number', 'object', 'undefined'] 
    };

    for (const key in schema) {
        if (required && !(key in keyboard)) {
            return { valid: false, error: `Le champ "${key}" est requis.` };
        }
        if (key in keyboard) {
            if (Array.isArray(schema[key])) {
                if (!schema[key].includes(typeof keyboard[key])) {
                    return { valid: false, error: `Le champ ${key} doit être de type ${schema[key].join('/')} (reçu: ${typeof keyboard[key]})` };
                }
            } else {
                if (typeof keyboard[key] !== schema[key]) {
                    return { valid: false, error: `Le champ ${key} doit être de type ${schema[key]} (reçu: ${typeof keyboard[key]})` };
                }
            }
        }
    }
    return { valid: true };
}