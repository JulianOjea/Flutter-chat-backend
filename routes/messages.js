/*
    Path: /api/messages
*/


const { Router } = require('express');

const { validateJWT } = require('../middlewares/jwt-validator');
const { getChat } = require('../controllers/messages');

const router = Router();

//, validateJWT
router.get('/:from', validateJWT, getChat);

module.exports = router;