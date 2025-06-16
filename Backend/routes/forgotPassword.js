const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');

const sendResetEmail = (email, token) => {
  console.log(`Email envoyé à ${email} : http://localhost:3000/reset-password/${token}`);
};

router.post('/', async (req, res) => {
  console.log('Headers reçus :', req.headers);
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email requis' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    console.log(`Lien de reset : http://localhost:3000/reset-password/${resetToken}`);

    res.json({ message: "Email de réinitialisation envoyé" });
  } catch (err) {
    console.error("Erreur dans /forgot-password:", err); // Ajouté
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
