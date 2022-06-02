let products = [
    { id: 1, name: 'Product 1', price: 100, img: 'ruta..' },
    { id: 2, name: 'Product 2', price: 99, img: 'ruta..' },
    { id: 3, name: 'Product 3', price: 300, img: 'ruta..' }
]


module.exports = {
    index: function(req, res) {
        
        return res.render('products/list', { products: products });
    },
    formNew: function(req, res) {
        return res.render('products/form');
    },
    create: function(req, res) {
        //imprimir los datos que vienen de formulario

        //guardo el nuevo producto con la estructura
        products.push({ id: 99, name: req.body.name, price: req.body.price, img: 'ruta..' })

        //redireccione al listado de productos        
        return res.redirect('/products');
    },
    formEdit: function(req, res) {
        //return res.send(req.params);
        //filtrar y buscar
        let product = { id: 99, name: 'producto a editar', price: 1200, img: 'ruta..' }

        return res.render('products/edit', {product: product});
    },
    edit: function(req, res) {
        //hacer la edicion
    },
    delete: function(req,res) {
        //hacer la eliminacion
    }
}
