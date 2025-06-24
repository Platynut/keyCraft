const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// Route POST pour réinitialiser le mot de passe avec un token
router.post('/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;   

  try {
    // On cherche l'utilisateur avec ce token valide
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Lien invalide ou expiré.' });
    }

    // On met à jour le mot de passe avec le nouveau
    user.password = newPassword;

    // On supprime le token et la date d'expiration pour ne plus pouvoir réutiliser ce lien
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save(); 

    res.json({ message: 'Mot de passe réinitialisé avec succès.' });

  } catch (err) {
    console.error(err);               
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router; 
