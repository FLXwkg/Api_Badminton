const validatePseudo = (req, res, next) => {
    const pseudo = req.params.pseudo;

    // Check if pseudo is not empty and meets certain criteria
    if (!pseudo || !/^[a-zA-Z0-9_]+$/.test(pseudo)) {
        return res.status(400).json({ error: 'Invalid pseudo' });
    }

    // If pseudo is valid, pass control to the next middleware
    next();
};

module.exports = validatePseudo;
