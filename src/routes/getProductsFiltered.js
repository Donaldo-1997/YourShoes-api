const { Router } = require('express');
const { Op } = require('sequelize');
const { Product } = require('../db')
const axios = require('axios')

const router = Router();

router.get('/pruebas', async (req, res, next) => {
    try {
        const { data } = await axios.get('https://api.mercadolibre.com/sites/MLA/search?q=zapatillas&offset=0')

        const results = data.results.map(product => ({
            title: product.title,
            image: product.thumbnail,
            model: product.attributes ? product.attributes[2].value_name : "Not found",
            price: product.price,
            brand: product.attributes[0].value_name
        }))

        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    let { priceMax, priceMin, brand } = req.query
    let productsFiltered = undefined

    if(priceMax) {
        try {
            productsFiltered = await Product.findAll({ 
                where: { 
                    price: { 
                        [Op.and]: [
                            { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
                            { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
                        ]
                    }
                } 
            })

            productsFiltered.sort((a, b) => b.price - a.price) // ordeno precio de mayor a menor
            
            res.status(200).json(productsFiltered)
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    else {
        try {
            productsFiltered = await Product.findAll({ 
                where: { 
                    price: { [Op.gte]: priceMin } // Precio sea mayor o igual a precio minimo
                } 
            })

            productsFiltered.sort((a, b) => a.price - b.price) // ordeno los precios de menor a mayor
    
            res.status(200).json(productsFiltered)
    
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    
})

module.exports = router;