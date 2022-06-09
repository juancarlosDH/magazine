const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer')

const controller = require('../controllers/authController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/users')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer ({storage})

router.get('/login', controller.showLogin);
router.post('/login', controller.login);

router.get('/register', controller.showRegister);
router.post('/register', upload.any(), controller.register);

router.post('/logout', controller.logout);

module.exports = router;
