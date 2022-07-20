const { Router } = require('express');
const {User} = require('../db.js');
const {Op} = require('sequelize')
const { validateAttributes } = require('../controllers/postValidation');
const router = Router();

//POST USER
//sacar id de user? dejar el que de la base de datos??
router.post("/", async (req, res) => {    
    try {
        const { name, surname, nickname, email, phone_number, date_of_Birth, address } = req.body
        // console.log(req.body); 
        const validation = validateAttributes(name, surname, nickname, email, phone_number, date_of_Birth, address);
        if (validation === true){
              
        const [newUser, created ]= await User.findOrCreate({ 
            where:{
             name, surname, nickname, email, phone_number, 
             defaults:{
                           date_of_Birth, address, isAdmin: false, isBanned: false, isActive: true
             }                        
            }
        })
        const eia = await newUser;
          
        console.log(newUser);
      res.send(`The User ${name} was created successfully`);
      } else{
    return res.status(404).send(validation)
  }  
    }
    catch (error) {
        res.status(500).json(error)
        console.log(error)
    }  });

  module.exports = router;