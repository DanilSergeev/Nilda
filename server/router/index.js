const Router = require("express").Router
const router = new Router()
const ideasController = require("../controllers/ideas-controller")
const dataItemController = require("../controllers/dataItem-controller")
const AuxiliaryDataController = require("../controllers/auxiliaryData-controller")
const upload = require('multer')();




// 
router.get('/ideas',  ideasController.getIdeas)
router.get('/idea/:id',  ideasController.getIdea)
router.post('/createIdea', ideasController.createIdea)
router.put('/idea/update/:id', ideasController.updateIdea)
router.delete('/idea/:id',  ideasController.deleteIdea)
// 
router.get('/categorys',  AuxiliaryDataController.getCategorys)
router.get('/countrys',  AuxiliaryDataController.getCountrys)
router.get('/category/:id',  AuxiliaryDataController.getCategory)
router.get('/country/:id',  AuxiliaryDataController.getCountry)
router.get('/imageOfItem/:id',  AuxiliaryDataController.getImageOfItem)
router.post('/crateCategory', AuxiliaryDataController.createCategory)
router.post('/crateCountry', AuxiliaryDataController.createCountry)
router.delete('/deleteCategory/:id',  AuxiliaryDataController.deleteCategory)
router.delete('/deleteCountry/:id',  AuxiliaryDataController.deleteCountry)
// 
router.get('/items',  dataItemController.getItems)
router.get('/itemsHero',  dataItemController.getItemsByHero)
router.get('/itemsItem',  dataItemController.getItemsByItem)
router.get('/item/:id',  dataItemController.getItem)    
router.post('/creatItem', dataItemController.creatItem)
router.put('/item/update/:id', dataItemController.updateItem)
router.put('/item/updateImage/:id', dataItemController.updateItemImages)
router.delete('/item/:id',  dataItemController.deleteItem)

module.exports = router