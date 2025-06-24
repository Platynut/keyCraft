const express = require('express');
const router = express.Router();
const crypto = require('crypto');          
const User = require('../models/User');     
const sendResetEmail = require('./mailer'); 

// Route POST pour demander la réinitialisation du mot de passe
router.post('/', async (req, res) => {
  const { email } = req.body;              
  if (!email)                              
    return res.status(400).json({ message: 'Email requis' });

  try {
    const user = await User.findOne({ email });
    if (!user)                                
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    // On crée un token 
    const resetToken = crypto.randomBytes(32).toString('hex');

    // On stocke ce token et sa date d'expiration dans la base (1 heure de validité)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();                        

    // On crée un lien complet avec le token pour la réinitialisation
    const resetLink = `http://localhost:3001/reset-password/${resetToken}`;

    // On envoie le mail à l'utilisateur avec ce lien
    await sendResetEmail(user.email, resetLink);


    res.json({ message: "Email de réinitialisation envoyé" });

  } catch (err) {
    console.error("Erreur dans /forgot-password:", err);  
    res.status(500).json({ message: 'Erreur serveur' });  
  }
});

module.exports = router;
