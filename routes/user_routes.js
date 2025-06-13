const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

router.get('/:id', userController.getUserById);

router.get('/isEntered/:id', userController.getIsEnteredById);

router.post('/add/:id', userController.addUser);

router.put('/update/:id', userController.updateUser);

router.get('/getUserById/:id', userController.getUserById);



module.exports = router;