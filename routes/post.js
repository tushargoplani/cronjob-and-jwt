const express = require('express');
const { getPosts,createUser, loginUser, validate } = require('../controllers/post');
const validator = require('../validator');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get("/", getPosts);
router.post("/create-user",validator.createPostValidator, createUser);
router.post("/login-user" ,  loginUser);
router.get("/validate-user", authenticate, validate)

module.exports = router;