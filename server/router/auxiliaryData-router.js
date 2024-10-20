const Router = require("express").Router;
const AuxiliaryDataController = require("../controllers/auxiliaryData-controller");
const authMiddlware = require("../middlware/auth-middlware");
const checkRoleMiddlware = require("../middlware/checkRole-middleware");

const router = new Router();

router.get('/categorys', AuxiliaryDataController.getCategorys);
router.get('/countrys', AuxiliaryDataController.getCountrys);
router.get('/category/:id', AuxiliaryDataController.getCategory);
router.get('/country/:id', AuxiliaryDataController.getCountry);
router.get('/imageOfItem/:id', AuxiliaryDataController.getImageOfItem);
router.post('/crateCategory', checkRoleMiddlware("ADMIN"), authMiddlware, AuxiliaryDataController.createCategory);
router.post('/crateCountry', checkRoleMiddlware("ADMIN"), authMiddlware, AuxiliaryDataController.createCountry);
router.delete('/deleteCategory/:id', checkRoleMiddlware("ADMIN"), authMiddlware, AuxiliaryDataController.deleteCategory);
router.delete('/deleteCountry/:id', checkRoleMiddlware("ADMIN"), authMiddlware, AuxiliaryDataController.deleteCountry);

module.exports = router;