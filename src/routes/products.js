const express = require('express');
const router = express.Router();

const controller = require('../controllers/productController')

/* GET home page. */
router.get('/', controller.index);

//rutas para crear
router.get('/create', controller.formNew);
router.post('/', controller.create);

//rutas para editar
router.get('/edit/:idProducto', controller.formEdit);
router.put('/:id', controller.create);

//ruta para eliminar
router.delete('/:id', controller.delete);

module.exports = router;
