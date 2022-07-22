const { Router } = require('express');
const {User, Order} = require('../db.js');
const {Op} = require('sequelize')
const { validateAttributes, validateAttribute } = require('../controllers/validation');
const router = Router();
const moment = require('moment')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../auth');

//POST USER
router.post("/signup", async (req, res) => {
  try {
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
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
          address,
          password          
        },
      })
      let token = jwt.sign({ user: newUser }, authConfig.secret, {
        expiresIn: authConfig.expires
    });
      !created ? res.status(201).send('There is already a user with that email') :
        res.status(200).json({
          user: newUser,
          token: token
      });
    } else {
      return res.status(404).send(validation)
    }
  }
  catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

// Login
router.post("/signin", async (req, res)=>{

try{
  let { email, password } = req.body;

     const user = await User.findOne({
      where: {
          email: email
      }
  }) 
      if (!user) {
          res.status(404).json({ msg: "Email o contraseña incorrecta" });
      } else {

          if (bcrypt.compareSync(password, user.password)) {

              // Creamos el token
              let token = jwt.sign({ user: user }, authConfig.secret, {
                  expiresIn: authConfig.expires
              });

              res.json({
                  user: user,
                  token: token
              })

          } else {

              // Unauthorized Access
              res.status(401).json({ msg: "Email o contraseña incorrecta" })
          }
      }
  } catch(err) {
      res.status(500).json(err);
  }
})



//GET USERS
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


//PUT USER
router.put('/', async (req, res) => {
  const { email } = req.query;
  const { name, surname, nickname, phone_number, date_of_Birth, address } = req.body;  
  try {
    const validation = validateAttribute(name, surname, nickname, phone_number, date_of_Birth, address);
    if (validation === true) {
    if(email){
    const us1 = await User.findOne({
      where: { email: email}      
    });
    
    if(us1 !== null){
    us1.name = name;
    us1.surname = surname;
    us1.nickname = nickname;    
    us1.phone_number = phone_number;
    us1.date_of_Birth = date_of_Birth;
    us1.address = address;
   
       await us1.save();
       res.status(200).json('Your User was Successfully Changed');            
  } else {
    res.send('You must enter your email correctly')
  }
} else {
    res.send('You must enter your email');    
  } 
} else {
  return res.status(404).send(validation);
}   
 } catch (error) {
    res.send("error");
    }
});

  
module.exports = router;