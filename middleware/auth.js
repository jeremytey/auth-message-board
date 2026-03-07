const requireAuth = (req, res, next) => {
    if(!req.user) {
        return res.redirect('/login');
    }
    next();
}

const requireAdmin = (req, res, next) => {
    if(!req.user || req.user.role !== 'admin') {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    requireAuth,
    requireAdmin
}