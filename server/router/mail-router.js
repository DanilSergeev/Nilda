const Router = require("express").Router;
const mailController = require("../controllers/mail-controller");
const { body } = require("express-validator");
const authMiddlware = require("../middlware/auth-middlware");

const router = new Router();

router.post('/mail-send',
    body('email').isEmail(),
    body('theam').isLength({ min: 2 }),
    body('message').isLength({ min: 6 }),
    authMiddlware,
    mailController.mailSend
);
router.get('/mail/activate/:link');

module.exports = router;