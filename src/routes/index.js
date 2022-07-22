const { Router } = require("express");
const router = Router();

//--------------------------IMPORT
const shoesRouter = require("./products");
const user = require("./users");
const categories= require("./categories")
const brands= require("./brands")
 
//--------------------------ROUTES
router.use("/user", user);
router.use("/shoes", shoesRouter);
router.use("/categories", categories);
router.use("/brands", brands)

module.exports = router;