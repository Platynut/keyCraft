const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const sendResetEmail = require('./mailer');

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email requis' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1h
    await user.save();

    const resetLink = `http://localhost:3001/reset-password/${resetToken}`; // ✅ lien complet
    await sendResetEmail(user.email, resetLink); // ✅ on envoie le lien complet

    res.json({ message: "Email de réinitialisation envoyé" });
  } catch (err) {
    console.error("Erreur dans /forgot-password:", err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
