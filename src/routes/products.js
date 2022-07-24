const { Router } = require('express');
const { Product, Brand, Category } = require('../db.js');
const { Op } = require('sequelize')
const { getByName, getByBrand, getByCategory, getByPrice, getAll } = require('../controllers/products.js');
const router = Router();

router.get('/', async (req, res, next) => {
  const { name, priceMax, priceMin, brand, category, size } = req.query;

  if(priceMax && priceMin && category && brand && name) {
    try {
      const results = await Product.findAll({
        where: {
          title: { [Op.iLike]: `%${name}%` },
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ]
          }
        },
        include: [
          { model: Brand, where:{name:{[Op.iLike]:`%${brand}%`}}},
          { model: Category,  where: { name: { [Op.iLike]: `%${category}%` } } },
        ]
      })
      res.status(200).json(results)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  else if(priceMax && priceMin && brand) {
    try {
      const results = (await getByBrand(brand)).filter(product => product.price <= priceMax && product.price >= priceMin)

      results.sort((a, b) => b.price - a.price) // ordeno precio de mayor a menor

      if(!results.length) res.status(400).send('no hay productos con esos filtros')

      res.status(200).json(results)

    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  else if(priceMax && priceMin && name) {
    try {
      const results = (await getByName(name)).filter(product => product.price <= priceMax && product.price >= priceMin)

      results.sort((a, b) => b.price - a.price) // ordeno precio de mayor a menor

      if(!results.length) res.status(400).send('no hay productos con esos filtros')

      res.status(200).json(results)

    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  else if(priceMax && priceMin && category) {
    try {
      const results = (await getByCategory(category)).filter(product => product.price <= priceMax && product.price >= priceMin)

      results.sort((a, b) => b.price - a.price) // ordeno precio de mayor a menor

      if(!results.length) res.status(400).send('no hay productos con esos filtros')

      res.status(200).json(results)

    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  else if (name) {
    try {
      const results = await getByName(name)

      res.status(200).json(results)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  else if (brand) {
    try {
      const results = await getByBrand(brand)

      res.status(200).json(results)

    } catch (error) {
      next(error)
    }
  }
  else if (category) {
    try {
      const results = await getByCategory(category)

      res.status(200).json(results)

    } catch (error) {
      next(error)
    }
  }
  else if (size) {
    try { 
       productsFiltered = await Product.findAll({
        where:{size:{[Op.contains]:[{number:size}]}},
        attributes: ['size'],
        include: [
          { model: Brand},
          { model: Category },
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
      const results = await getByPrice(priceMin, priceMax)

      res.status(200).json(results)

    } catch (error) {
      next(error)
    }
  }
  else {
    try {
      const results = await getAll()

      res.status(200).json(results)

    } catch (error) {
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
      size,
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
        size
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