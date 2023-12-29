const validateDisponible = (req, res, next) => {
    const disponible = req.query.disponible;

    // Check if 'disponible' is provided and is either 0 or 1
    if (disponible && ![0, 1].includes(Number(disponible))) {
        return res.status(400).json({ error: 'Invalid value for disponible' });
    }

    // If 'disponible' is valid or not provided, pass control to the next middleware
    next();
};

module.exports = validateDisponible;
