const Router = require("express").Router;
const ideasController = require("../controllers/ideas-controller");
const authMiddlware = require("../middlware/auth-middlware");
const checkRoleMiddlware = require("../middlware/checkRole-middleware");

const router = new Router();

router.get('/ideas', ideasController.getIdeas);
router.get('/idea/:id', ideasController.getIdea);
router.post('/createIdea', checkRoleMiddlware("ADMIN"), authMiddlware, ideasController.createIdea);
router.put('/idea/update/:id', checkRoleMiddlware("ADMIN"), authMiddlware, ideasController.updateIdea);
router.delete('/idea/:id', checkRoleMiddlware("ADMIN"), authMiddlware, ideasController.deleteIdea);

module.exports = router;