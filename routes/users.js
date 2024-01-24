 /*
    path: api/users
 */

const { Router } = require('express');

const { validateJWT } = require('../middlewares/jwt-validator');
const { getUsers} = require('../controllers/users');

const router = Router();

//, validateJWT
router.get('/', validateJWT, getUsers);

module.exports = router;