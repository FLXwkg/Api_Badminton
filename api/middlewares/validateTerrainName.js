const validateTerrainName = (req, res, next) => {
    const allowedNames = ['a', 'b', 'c', 'd'];
    const terrainName = req.params.name.toLowerCase();

    if (!allowedNames.includes(terrainName)) {
    return res.status(400).json({ "msg": "Le nom du terrain doit être 'a', 'b', 'c' ou 'd'." });
    }

    // Passer à la prochaine fonction middleware ou à la route
    next();
};

module.exports = validateTerrainName;
  