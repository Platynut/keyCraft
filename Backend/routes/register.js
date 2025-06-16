const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, address } = req.body;

    // Vérification des champs obligatoires
    if (!username || !email || !password || !firstName || !lastName || !address) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si utilisateur ou email existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "L'email ou le nom d'utilisateur est déjà utilisé." });
    }

    // Création et sauvegarde de l'utilisateur
    const newUser = new User({
      username,
      email,
      password,   // mot de passe en clair ici, le hash sera fait par le middleware 'pre save'
      firstName,
      lastName,
      address
    });

    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

module.exports = router;
