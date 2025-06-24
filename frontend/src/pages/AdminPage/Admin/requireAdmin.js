const requireAdmin = async (req, res, next) => {
    try {
        // Vérifier si l'utilisateur est connecté
        if (!req.user) {
            return res.status(401).redirect('/login?redirect=admin');
        }

        // Vérifier si l'utilisateur est admin
        if (!req.user.isAdmin) {
            return res.status(403).render('error', {
                message: 'Accès refusé - Privilèges administrateur requis',
                statusCode: 403
            });
        }

        next();
    } catch (error) {
        console.error('Erreur middleware admin:', error);
        res.status(500).render('error', { message: 'Erreur serveur' });
    }
};

module.exports = { requireAdmin };