const { User } = require('../models/index');

module.exports = {

    getUser(req, res, next) {
        if(req.user.id === req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para acceder a esta pagina"});
        }
    },

    update(req, res, next) {
        if(req.user.id === req.post.userId  || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    },

    delete(req, res, next) {
        if(req.user.id === req.post.userId  || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    }
}