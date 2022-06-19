const {Router} = require('express');
const {Country, Activities} = require('../db');

const router = Router();

router.post('/', async (req, res) => {
    const {name, difficulty, duration, season, country} = req.body;
    
    let activity = await Activities.create({
        name: name,
        duration: duration,
        difficulty: difficulty,
        season: season
    })
 
    activity.addCountries(country)
    res.send("Creado con exito")
})


module.exports = router; 