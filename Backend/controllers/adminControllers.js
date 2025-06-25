const fs = require('fs').promises;
const path = require('path');
const User = require('../models/User');
const { read } = require('fs');

// Fonction utilitaire pour lire les JSON (UNIQUEMENT côté serveur)
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

//Fonction pour obtenir les statistiques (côté serveur)
const getDashboardStats = async (req, res) => {
    try {
        // Lire les fichiers JSON côté serveur
        const [productsData, ordersData] = await Promise.all([
            readJsonFile('clavier.json'),
            readJsonFile('orders.json')
        ]);

        const stats = {
            totalUsers: await User.countDocuments(),
            totalProducts: productsData.length,
            totalOrders: ordersData.length,
        };

        res.status(200).json({
            success: true,
            data: stats,
            message: 'Statistiques récupérées avec succès'
        });

    } catch (error) {
        console.error('Erreur dashboard admin:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors du chargement du dashboard',
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            data: users,
            message: 'Utilisateurs récupérés avec succès'
        });

    } catch (error) {
        console.error('Erreur récupération utilisateurs:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des utilisateurs',
            error: error.message
        });
    }
};

const toggleUserAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Optionnel : empêcher de retirer ses propres droits admin
        if (user._id.equals(req.user._id)) {
            return res.status(400).json({ message: "Impossible de modifier ses propres droits admin." });
        }

        user.isAdmin = !user.isAdmin; // Inverse le statut admin !
        await user.save();

        return res.json({
            message: `Droits administrateur ${user.isAdmin ? 'attribués' : 'retirés'} avec succès.`,
            isAdmin: user.isAdmin
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    toggleUserAdmin
};