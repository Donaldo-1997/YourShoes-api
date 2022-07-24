const { Router } = require('express');
const { Product, Brand, Category } = require('../db.js');
const { Op } = require('sequelize')
const {setDataApi } = require("../controllers/index.js");
const router = Router();

let cargo = false
router.get('/', async (req, res, next) => {
  const { name, priceMax, priceMin, brand, category } = req.query;
  let productsFiltered = undefined;
  if (name) {
    try {
      const nameSearch = await Product.findAll({
        where: {
          title: { [Op.iLike]: `%${name}%` } 
        },
         include: [
          { model: Brand },
          { model: Category }
        ]
      })

      if (!nameSearch.length) return res.status(404).send(`El nombre '${name}' no arrojo ningun resultado`)
      res.json(nameSearch)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  else if (brand) {
    try {
      productsFiltered = await Product.findAll({
        include: [
          { model: Brand, where:{name:{[Op.iLike]:`%${brand}%`}}},
          { model: Category },
        ]
      })
      res.status(200).json(productsFiltered)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  else if (category) {
    try {
      productsFiltered = await Product.findAll({
        include: [
          { model: Brand},
          { model: Category, where:{name:{[Op.iLike]:`%${category}%`}} },
        ]
      })
      res.status(200).json(productsFiltered)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  else if (priceMax) {
    try {
      productsFiltered = await Product.findAll({
        where: {
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ]
          }
        },
        include: [
          { model: Brand },
          { model: Category },
        ]
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
      let result = cargo ? await Product.findAll({
        include: [
          { model: Brand },
          { model: Category }
        ]
      }) : await setDataApi()
      cargo = true; 
      res.status(200).json(result)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const foundProduct = await Product.findByPk(id,
        {
          include: [
            { model: Brand },
            { model: Category }
          ]
        });

      if (foundProduct) {
        res.status(200).send(foundProduct);
      } else {
        res.status(400).json("ID not found");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      model,
      image,
      price,
      brand,
      category
    } = req.body

    const [newProduct, created] = await Product.findOrCreate({
      where: {
        title
      },
      defaults: {
        id: `MLA${Math.round(Math.random() * 1000000000)}`,
        model,
        image,
        price,
      },
    })
    const findCategories = await Category.findOne({ where: { name: { [Op.iLike]: `%${category}%` } } })
    const findBrand = await Brand.findOne({ where: { name: { [Op.iLike]: `%${brand}%` } } })
    newProduct.setCategory(findCategories)
    newProduct.setBrand(findBrand)

    !created ? 
      res.status(201).send('There is already a Product with that title') 
      : res.status(200).json(newProduct);

  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }
})

module.exports = router;