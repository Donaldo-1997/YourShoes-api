const { Router } = require("express");
const router = Router();

//--------------------------IMPORT
const shoesRouter = require("./shoes");
const user = require("./postput");
const categories= require("./getCategories")
const brands= require("./brands")
 
//--------------------------ROUTES
router.use("/user", user);
router.use("/shoes", shoesRouter);
router.use("/categories", categories);
router.use("/brands", brands)

module.exports = router;