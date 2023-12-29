const authenticateAdmin = (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;
    const adminUsername = 'admybad';
    const adminPassword = 'admybad';
  
    // Check if the provided credentials match the hardcoded admin credentials
    if (username && username === adminUsername && password && password === adminPassword) {
      // If credentials are valid, proceed to the next middleware or route
      next();
    } else {
        console.log('username, password :>> ', username, password);
      // If credentials are invalid, return unauthorized response
      res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authenticateAdmin;