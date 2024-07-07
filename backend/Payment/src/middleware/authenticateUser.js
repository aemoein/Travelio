const authenticateUser = (req, res, next) => {
    // Mock authentication for example purposes
    req.user = {
        email: 'user@example.com'
    };
    next();
};


module.exports = authenticateUser;