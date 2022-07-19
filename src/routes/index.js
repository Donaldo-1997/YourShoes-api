const { Router } = require("express");
const router = Router();

//--------------------------IMPORT
const shoesRouter = require("./shoes");
const shoesFilter = require("./getProductsFiltered");

//--------------------------ROUTES
router.use("/shoes/filter", shoesFilter);
router.use("/shoes", shoesRouter);

module.exports = router;