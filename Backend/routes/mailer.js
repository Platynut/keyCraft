// mailer.js
const nodemailer = require('nodemailer');

// ⚠️ Remplace par tes identifiants Mailtrap
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "40534bc6d9ae87",
    pass: "06008b7ada4304"
  }
});

async function sendResetEmail(to, resetLink) {
  const mailOptions = {
    from: '"MonApp" <no-reply@monapp.com>',
    to,
    subject: "Réinitialisation de mot de passe",
    html: `
      <h2>Réinitialisation de mot de passe</h2>
      <p>Bonjour, voici votre lien pour réinitialiser votre mot de passe :</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Si vous n'avez pas demandé cela, ignorez ce message.</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé :", info.messageId);
  } catch (error) {
    console.error("Erreur d’envoi :", error);
  }
}

module.exports = sendResetEmail;
