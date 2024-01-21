 /*
    path: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.post('/new', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('email', 'Email is mandatory').not().isEmpty(),
    check('email', 'Wrong email format').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    check('password', 'Password length minimum 6 characters or numbers').isLength({min:6}),
    fieldValidator
],createUser);

router.post('/', [
    check('password', 'Password is mandatory').not().isEmpty(),
    check('email', 'Email is mandatory').not().isEmpty(),
    check('email', 'Wrong email format').isEmail(),
    fieldValidator
], login);

//, validateJWT
router.get('/renew', validateJWT, renewToken);

module.exports = router;