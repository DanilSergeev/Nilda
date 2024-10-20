const Router = require("express").Router;
const ideasRoutes = require("./ideas-router");
const auxiliaryDataRoutes = require("./auxiliaryData-router");
const dataItemRoutes = require("./dataItems-router");
const mailRoutes = require("./mail-router");
const userRoutes = require("./user-router");

const router = new Router();

router.use(ideasRoutes);
router.use(auxiliaryDataRoutes);
router.use(dataItemRoutes);
router.use(mailRoutes);
router.use(userRoutes);

module.exports = router;