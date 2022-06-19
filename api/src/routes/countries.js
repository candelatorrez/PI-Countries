const {Router} = require('express');
const Axios = require('axios');
const {Op} = require('sequelize');
const {Country, Activities} = require('../db');

const router = Router();

const getCountries =   async () => {
    const response = await Axios.get('https://restcountries.com/v3/all')
    const arrayCountry = await response.data.map(c => {
        const country = {
            id3: c.cca3,
            name: c.name.common,
            flags: c.flags[1],
            continent: c.continents[0],
            capital: c.capital?.length ? c.capital[0] : "Capital no encontrada",
            region: c.region,
            subregion: c.subregion !== null ? c.subregion : "Subregion no encontrada",
            area: c.area,
            population: c.population 
        }
        return country
    })
    return arrayCountry
}

const countriesDb = async () => {
    try{
        const countries = await Country.findAll();
        if(countries.length === 0){
            const arrayC = await getCountries();
            await Country.bulkCreate(arrayC)
        }
    } catch(error) {
        console.log(error)
    }
}

const load = async () => {
    await countriesDb() 
}
load();
 
router.get('/', async (req, res) => {
    const {name} = req.query;
    
    await load();
    try {
        if(name){
            let country = await Country.findOne({
                where: {
                    name: {
                        [Op.iLike]: `%${name}`,
                    }
                }
            })
            if (country) {
            res.json(country);
         } else {
                res.send("Pais no encontrado")
            }
        } 
        let countries = await Country.findAll();
        res.json(countries)
    } catch (error) {
        console.log(error)
    }
})


router.get('/:idCountry', async (req, res) => {
    const {idCountry} = req.params;

    try{
        const country = await Country.findOne({
            where: {
                id3: idCountry.toUpperCase()
            },
            include: [{
                model: Activities,
                attributes: ['id','name', 'difficulty', 'duration', 'season'],
                through: { attributes: []}
            }]
        })
        if(country) {
            return res.status(200).json(country)
        } else {
            return res.status(404).send('Pais no encontrado')
        }
    } catch(error){
        console.log(error)
    }
})


module.exports = router; 