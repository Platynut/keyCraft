const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Lien invalide ou expiré.' });
    }

    user.password = newPassword; // pas de hash ici
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save(); // le hash se fait ici automatiquement

    res.json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
