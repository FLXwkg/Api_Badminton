const validateReservationId = (req, res, next) => {
    const reservationId = req.params.reservationId;

    // Check if reservationId is a positive integer
    if (!/^\d+$/.test(reservationId) || parseInt(reservationId) <= 0) {
        return res.status(400).json({ error: 'Invalid reservationId' });
    }

    // If reservationId is valid, pass control to the next middleware
    next();
};

module.exports = validateReservationId;
