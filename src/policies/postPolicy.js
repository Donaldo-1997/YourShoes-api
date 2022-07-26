const { User } = require('../db');

module.exports = {

    async getUser(req, res, next) {
        console.log(req)
        const userId= await User.findByPk(req.user.id)
        if(userId.isAdmin) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para acceder a esta página" });
        }
    },


}