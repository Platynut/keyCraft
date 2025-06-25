const express = require('express');
const router = express.Router();
const keyboardControllers = require('../controllers/keyboardControllers');

const authenticateAdmin = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token manquant.' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token invalide.' });
        try {
            const user = await User.findById(decoded.userId);
            if (!user || !user.isAdmin) {
                return res.status(403).json({ message: "Accès interdit, droits admin requis." });
            }
            req.user = user;
            next();
        } catch (err) {
            return res.status(500).json({ message: 'Erreur serveur' });
        }
    });
};

router.get('/', keyboardControllers.GetAllProducts);
router.post('/', keyboardControllers.CreateKeyboard);
router.put('/:id', keyboardControllers.UpdateKeyboard);
router.delete('/:id', keyboardControllers.DeleteKeyboard);

module.exports = router;