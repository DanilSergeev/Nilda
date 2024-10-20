const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddlware = require("../middlware/auth-middlware");
const checkRoleMiddlware = require("../middlware/checkRole-middleware");

const router = new Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser );
router.put('/user/:id', checkRoleMiddlware("ADMIN"), authMiddlware, userController.updateUser );

module.exports = router;
