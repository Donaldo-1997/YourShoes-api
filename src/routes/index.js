const { Router } = require("express");
const router = Router();

//--------------------------IMPORT
const shoesRouter = require("./shoes");
const shoesFilter = require("./getProductsFiltered");
const user = require("./postput");
const categories= require("./getCategories")
 
//--------------------------ROUTES
router.use("/user", user);
router.use("/shoes/filter", shoesFilter);
router.use("/shoes", shoesRouter);
router.use("/categories", categories)
module.exports = router;