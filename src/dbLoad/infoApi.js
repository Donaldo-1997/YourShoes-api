const axios = require('axios');

const infoApi = async () => {
    const apiData = await axios('https://api.mercadolibre.com/sites/MLA/search?q=zapatillas&offset=0');
    const results = apiData.data.results.map((s) => {
        return{
     
            title: s.title,
            image: s.thumbnail,
            model: s.attributes ? s.attributes[2].value_name : "Not found",
            price: s.price,
        }
    });
    return results;
}

module.exports = {infoApi};