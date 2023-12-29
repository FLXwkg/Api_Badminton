const authenticateAdmin = (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;
    const adminUsername = 'admybad';
    const adminPassword = 'admybad';
  
    if (username && username === adminUsername && password && password === adminPassword) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateAdmin;