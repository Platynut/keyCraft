const fs = require('fs').promises;
const path = require('path');

// Utilitaire pour lire les JSON
async function readJsonFile(filename) {
    try {
        const filePath = path.join(__dirname, '../../ressources', filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erreur lecture ${filename}:`, error);
        return [];
    }
}

// Utilitaire pour écrire le JSON
async function writeJsonFile(filename, data) {
    const filePath = path.join(__dirname, '../../ressources', filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

const GetAllProducts = async (req, res) => {
    const keyboards = await readJsonFile('clavier.json');
    res.json(keyboards);
}

const CreateKeyboard = async (req, res) => {
    const keyboards = await readJsonFile('clavier.json');
    const newKeyboard = { ...req.body, id: Date.now().toString() }; // .toString() !
    keyboards.push(newKeyboard);
    await writeJsonFile('clavier.json', keyboards);
    res.status(201).json(newKeyboard);
}

const DeleteKeyboard = async (req, res) => {
    let keyboards = await readJsonFile('clavier.json');
    keyboards = keyboards.filter(kb => kb.id !== req.params.id);
    await writeJsonFile('clavier.json', keyboards);
    res.json({ message: 'Clavier supprimé.' });
};

const UpdateKeyboard = async (req, res) => {
    let keyboards = await readJsonFile('clavier.json');
    const index = keyboards.findIndex(kb => kb.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Introuvable' });
    keyboards[index] = { ...keyboards[index], ...req.body };
    await writeJsonFile('clavier.json', keyboards);
    res.json(keyboards[index]);
};

module.exports = {
    GetAllProducts,
    CreateKeyboard,
    DeleteKeyboard,
    UpdateKeyboard
};
