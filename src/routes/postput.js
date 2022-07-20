const { Router } = require('express');
const {User, Order} = require('../db.js');
const {Op} = require('sequelize')
const { validateAttributes } = require('../controllers/postValidation');
const router = Router();
const moment = require('moment')

//POST USER
//sacar id de user? dejar el que de la base de datos??
router.post("/", async (req, res) => {
  try {
    const { name, surname, nickname, email, phone_number, date_of_Birth, address} = req.body
    console.log(req.body);
    const validation = validateAttributes(name, surname, nickname, email, phone_number, date_of_Birth, address);
    if (validation === true) {

      const [newUser, created] = await User.findOrCreate({
        where: {
          email
        },
        defaults: {
          name,
          surname,
          nickname,
          phone_number,
          date_of_Birth,
          address
        },
      })
      !created ? res.status(201).send('There is already a user with that email') :
        res.status(200).json(newUser);
    } else {
      return res.status(404).send(validation)
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});
router.get("/", async(req, res)=>{
  try{
    const data= await User.findAll({order:[['name',"ASC"]],
    include:{
    model: Order,
    attributes: ['id']
}})
    res.status(200).json(data)
  }catch(error){
    res.status(200).json(error)
  }
})

  module.exports = router;