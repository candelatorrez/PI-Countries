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
            let array = [];

            let country = await Country.findOne({
                where: {
                    name: {
                        [Op.iLike]: `%${name}`,
                    },
                },
                include: [{
                    model: Activities,
                    attributes: ["id", "name"],
                    through: {attributes: []},   
                    required: false,
                }],
            })
            if (country) {
                array.push(country)

            res.json(array);
         } else {
                res.send("Pais no encontrado")
            }
        } 
        let countries = await Country.findAll({
            include: [{
                model: Activities,
                attributes: ["id", "name"],
                through: {attributes: []},   
                required: false,
            }],
        });
        res.json(countries)
    } catch (error) {
        console.log(error)
    }
})


router.get('/:idCountry', async(req, res)=>{
    const {idCountry} = req.params
     try{
          const getCountry = await Country.findByPk(idCountry.toUpperCase(), 
          {
              include: {
                 model: Activities,
                }
          })
          if(getCountry !== null){
            return res.send(getCountry)
          }else{
            res.send('Pais no encontrado')
         }
      }catch(error){
          console.log(error)
      }
 })

 router.put('/:idCountry', async(req, res) => {
    try {
        let {idCountry} = req.params;
        const body = req.body;
        let response = await Country.update(body, ({
            where: {
                id3: idCountry
            }
        }))
        res.send(response)
    } catch (error) {
        console.log(error)
    }
 })


module.exports = router; 