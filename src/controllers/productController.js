const fs = require('fs')
const path = require('path')

const controller = {
    readJson: function () {
        const pJson = fs.readFileSync(path.join(__dirname, '../database/products.json'));
        const products = JSON.parse(pJson)
        return products
    },
    writeJson: function (prods) {
        const data = JSON.stringify(prods, null, 4)
        const pJson = fs.writeFileSync(path.join(__dirname, '../database/products.json'), data);
        return pJson
    },
    lastProductId: function(prods) {
        if (prods.length == 0) { return 0 }
        return Math.max(...prods.map(p => p.id))
    },
    index: function(req, res) {
        const prods = controller.readJson() 
        return res.render('products/list', { products: prods });
    },
    formNew: function(req, res) {
        return res.render('products/form');
    },
    create: function(req, res) {
        //leer el json
        const prods = controller.readJson() 

        const idCalculated = controller.lastProductId(prods) + 1

        //si hay imagen
        let image = '';
        if (req.file) {
            //le saco la palabra public para que sea a partir
            image = req.file.filename;
        }

        //guardo el nuevo producto con la estructura
        prods.push({ id: idCalculated, name: req.body.name, price: req.body.price, img: image })

        //reescribo el json
        controller.writeJson(prods)

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

module.exports = controller