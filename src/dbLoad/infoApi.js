const axios = require('axios');

const infoApi = async () => {

    const request = []

    for (let i = 0; i < 4; i++) {
        request.push(axios(`https://api.mercadolibre.com/sites/MLA/search?q=zapatillas&offset=${i}`))
    }

    const apiData = (await Promise.all(request)).map(result => result.data.results).flat()

    
    const results = apiData.map((s) => {
        return{
            title: s.title,
            image: s.thumbnail,
            model: s.attributes ? s.attributes[2].value_name : "Not found",
            price: parseInt(s.price),
            brand: s.attributes[0].value_name
        }
    });
    
    return results;
}

module.exports = {infoApi};