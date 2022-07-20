const  {infoApi} = require('./infoApi.js');
const {Product} = require('../db.js');

const fillDB = async ()=>{
    try{
        //comprobamos que la db este con datos  
        let checkDb = await Product.findAll()
            // si la db esta vacia vamos a llenarla con los datos de la api
            if(!checkDb.length){
            //nos traemos toda la info de la api
            const shoes = await infoApi()
            //inyectamos los datos a la db
            await Product.bulkCreate(shoes)             
            }
    } catch (error){
        throw error 
    }
}

module.exports = {fillDB};