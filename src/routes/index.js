const { Router } = require("express");
const router = Router();
var logger = require('morgan');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);

//--------------------------IMPORT
const shoesRouter = require("./products");
const user = require("./users");
const categories= require("./categories")
const brands= require("./brands");
const login = require('./login')
const google = require('./google')
const mercadoRouter = require("./mercadopago.js")
//--------------------------ROUTES
router.use("/google", google)
router.use("/login", login)
router.use("/user/", user);
router.use("/shoes", shoesRouter);
router.use("/categories", categories);
router.use("/brands", brands)
router.use("/mercadopago", mercadoRouter)



module.exports = router;