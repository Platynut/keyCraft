const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { emailOrusername, password } = req.body;

    // Vérification des champs requis
    if (!emailOrusername || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Recherche de l'utilisateur par email OU pseudo
    const user = await User.findOne({
      $or: [{ email: emailOrusername }, { username: emailOrusername }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Identifiant introuvable.' });
    }

    // Vérification du mot de passe avec bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Création du token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ message: 'Connexion réussie !', token });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

module.exports = router;
