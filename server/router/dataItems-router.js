const Router = require("express").Router;
const dataItemController = require("../controllers/dataItem-controller");
const authMiddlware = require("../middlware/auth-middlware");
const checkRoleMiddlware = require("../middlware/checkRole-middleware");

const router = new Router();

router.get('/items', dataItemController.getItems);
router.get('/itemsHero', dataItemController.getItemsByHero);
router.get('/itemsItem', dataItemController.getItemsByItem);
router.get('/item/:id', dataItemController.getItem);
router.post('/item', checkRoleMiddlware("ADMIN"), authMiddlware, dataItemController.creatItem);
router.put('/item/update/:id', checkRoleMiddlware("ADMIN"), authMiddlware, dataItemController.updateItem);
router.put('/item/updateImage/:id', checkRoleMiddlware("ADMIN"), authMiddlware, dataItemController.updateItemImages);
router.delete('/item/:id', checkRoleMiddlware("ADMIN"), authMiddlware, dataItemController.deleteItem);
router.delete('/item/deleteImages/:id', checkRoleMiddlware("ADMIN"), authMiddlware, dataItemController.deleteImagesOfItem);

module.exports = router;