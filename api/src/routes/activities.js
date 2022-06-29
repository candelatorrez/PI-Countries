const {Router} = require('express');
const {Country, Activities} = require('../db');

const router = Router();

router.post('/', async (req, res) => {
    const {name, difficulty, duration, season, idCountry} = req.body;
    console.log(idCountry)
    try {
        
    const created = await Activities.create({
        name, 
        difficulty,
        duration,
        season
    });
    const dbCountries = await Country.findAll({
        where: {
            id3: idCountry
        },
    });
    
    const result = await created.addCountries(dbCountries)

    return res.status(200).send({result, message: 'Activity created'})

    } catch (error) {
        return res.status(400).send({message: 'Creation failed'})
    }
} )



router.get('/', async (req, res) => {
    try {
        const activities = await Activities.findAll({
            include: {
                model: Country,
                attributes: ["id3"],
                through: {attributes: []}   
            }
        });
        
        return res.status(200).send(activities)
    } catch (error) {
        return res.status(400).send(error)
    }
})





module.exports = router; 