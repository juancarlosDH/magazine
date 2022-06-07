const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer')

const controller = require('../controllers/productController')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer ({storage})

/* GET home page. */
router.get('/', controller.index);

//rutas para crear
router.get('/create', controller.formNew);
router.post('/', upload.single('img'), controller.create);

//rutas para editar
router.get('/edit/:idProducto', controller.formEdit);
router.put('/:id', controller.create);

//ruta para eliminar
router.delete('/:id', controller.delete);

module.exports = router;
