const { Router } = require("express");
const { Brand } = require("../db");
const router = Router();
const axios = require("axios");
const { getDbBrand } = require("../controllers/index.js");
const { defaults } = require("pg");

router.get("/", async (req, res) => {
  try {
    const dbBrands = await getDbBrand();
    
    if (!dbBrands.length) {
      const request = []

      for (let i = 0; i < 4; i++) {
        request.push(axios(`https://api.mercadolibre.com/sites/MLA/search?q=zapatillas&offset=${i}`))
      }

      const brandsApi = (await Promise.all(request)).map(result => result.data.results).flat()

      const brandsMap = brandsApi.map((s) => ({
        id: s.attributes[0].value_id || `${Math.round(Math.random() * 1000000000)}`,
        brand: s.attributes[0].value_name
      }))

      const setBrands = [...new Set(brandsMap.map(JSON.stringify))].map(e => JSON.parse(e))
      //me la llevo para toda la vida
     
        setBrands.forEach(async(s)=>{
        await Brand.findOrCreate({
          where: {id:s.id},
          defaults:{ name: s.brand}
        })
      })
    
      res.status(200).send(setBrands)
    } else {
      res.send(dbBrands)
    }
  } catch (err) {
    console.log(err + " - - Catch en brands");
  }
});
module.exports = router