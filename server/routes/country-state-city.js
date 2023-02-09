const express = require('express');
const router = express.Router();

const { Country, City } = require('country-state-city');

/* GET all countries. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await Country.getAllCountries());
  } catch (err) {
    console.error(`Error while getting countries `, err.message);
    next(err);
  }
});

/* GET all cities of selected country. */
router.get('/:countryCode', async function (req, res, next) {
  try {
    res.json(await City.getCitiesOfCountry(req.params.countryCode));
  } catch (err) {
    console.error(`Error while getting cities `, err.message);
    next(err);
  }
});

module.exports = router;
