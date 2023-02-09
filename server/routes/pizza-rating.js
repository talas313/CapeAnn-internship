const express = require('express')
const router = express.Router()

const pizzaRating = require('../services/pizza-rating')
const auth = require('../middleware/auth')

/* GET pizza-ratings. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await pizzaRating.getRatings())
  } catch (err) {
    console.error(`Error while getting ratings `, err.message)
    next(err)
  }
})

/* GET pizza-ratings by pizzaId. */
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await pizzaRating.getRatingByPizzaId(req.params.id))
  } catch (err) {
    console.error(`Error while getting rating `, err.message)
    next(err)
  }
})

/* POST pizza-rating */
router.post('/', auth, async function (req, res, next) {
  try {
    res.json(await pizzaRating.createRating(req.body))
  } catch (err) {
    console.error(`Error while creating new rating`, err.message)
    next(err)
  }
})

/* PATCH pizza-rating */
router.patch('/:id', auth, async function (req, res, next) {
  try {
    res.json(await pizzaRating.updateRating(req.params.id, req.body))
  } catch (err) {
    console.error(`Error while updating rating`, err.message)
    next(err)
  }
})

/* DELETE pizza-rating */
router.delete('/:id', auth, async function (req, res, next) {
  try {
    res.json(await pizzaRating.deleteRating(req.params.id))
  } catch (err) {
    console.error(`Error while deleting rating`, err.message)
    next(err)
  }
})

module.exports = router
