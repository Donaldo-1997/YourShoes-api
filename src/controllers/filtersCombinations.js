const { Product, Brand, Category } = require('../db');
const { Op } = require('sequelize');


function getAllFilters({ priceMax, priceMin, category, brand, name }) {
    let options = {}
    if (priceMax && priceMin && category && brand && name) {
      options = {
        where: {
          title: { [Op.iLike]: `%${name}%` },
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ],
          }
        },
        include: [
          { model: Brand, where: { name: { [Op.iLike]: `%${brand}%` } } },
          { model: Category, where: { name: { [Op.iLike]: `%${category}%` } } },
        ]
      }
    }
    else if(brand && priceMax && priceMin){
      options = {
        where: {
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ],
          }
        },
        include: [
          { model: Brand, where: { name: { [Op.iLike]: `%${brand}%` } } },
          { model: Category},
        ]
      }
    }
    else if( name && priceMax && priceMin){
      options = {
        where: {
          title: { [Op.iLike]: `%${name}%` },
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ],
          }
        },
        include: [
          { model: Brand},
          { model: Category},
        ]
      }
    }
    else if(name && brand){
      options = {
        where: {
          title: { [Op.iLike]: `%${name}%` },
        },
        include: [
          { model: Brand, where: { name: { [Op.iLike]: `%${brand}%` } } },
          { model: Category},
        ]
      }
    }
    else if(name && brand && priceMax && priceMin){
      options = {
        where: {
          title: { [Op.iLike]: `%${name}%` },
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ],
          }
        },
        include: [
          { model: Brand, where: { name: { [Op.iLike]: `%${brand}%` } } },
          { model: Category},
        ]
      }
    }
    else if(priceMax && priceMin && category){
      options = {
        where: {
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ],
          }
        },
        include: [
          { model: Brand},
          { model: Category, where: { name: { [Op.iLike]: `%${category}%` } } },
        ]
      }
    }
    else if(category && name){
      options = {
        where: {
          title: { [Op.iLike]: `%${name}%` },
        },
        include: [
          { model: Brand},
          { model: Category, where: { name: { [Op.iLike]: `%${category}%` } } },
        ]
      }
    }
    else if(category && brand){
      options = {
        include: [
          { model: Brand, where: { name: { [Op.iLike]: `%${brand}%` } } },
          { model: Category, where: { name: { [Op.iLike]: `%${category}%` } } },
        ]
      }
    }
    else if(category && brand && name){
      options = {
        where: {
          title: { [Op.iLike]: `%${name}%` },
        },
        include: [
          { model: Brand, where: { name: { [Op.iLike]: `%${brand}%` } } },
          { model: Category, where: { name: { [Op.iLike]: `%${category}%` } } },
        ]
      }
    }
    else if(category && brand && priceMax && priceMin){
      options = {
        where: {
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ],
          }
        },
        include: [
          { model: Brand, where: { name: { [Op.iLike]: `%${brand}%` } } },
          { model: Category, where: { name: { [Op.iLike]: `%${category}%` } } },
        ]
      }
    }
    else if(category && name && priceMax && priceMin){
      options = {
        where: {
          title: { [Op.iLike]: `%${name}%` },
          price: {
            [Op.and]: [
              { [Op.gte]: priceMin ? priceMin : 0 }, // Precio sea mayor o igual a precio minimo
              { [Op.lte]: priceMax } // Precio sea menor o igual a precio maximo
            ],
          }
        },
        include: [
          { model: Brand},
          { model: Category, where: { name: { [Op.iLike]: `%${category}%` } } },
        ]
      }
    }
    return options
  }
  module.exports={getAllFilters}