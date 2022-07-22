const { Router } = require("express");
const router = Router();

//--------------------------IMPORT
const shoesRouter = require("./products");
const user = require("./users");
const categories= require("./categories")
const brands= require("./brands");
const authGoogle = require('./authGoogle');
const login = require('./login')
 
//--------------------------ROUTES
router.use("/google", authGoogle)
router.use("/login", login)
router.use("/user/", user);
router.use("/shoes", shoesRouter);
router.use("/categories", categories);
router.use("/brands", brands)

module.exports = router;