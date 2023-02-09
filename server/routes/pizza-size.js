const express = require('express');
const router = express.Router();

const pizzaSize = require('../services/pizza-size');
const auth = require('../middleware/auth');

/* GET pizza-sizes. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await pizzaSize.getSizes());
  } catch (err) {
    console.error(`Error while getting sizes `, err.message);
    next(err);
  }
});

/* GET pizza-sizes by pizzaId. */
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await pizzaSize.getSizeByPizzaId(req.params.id));
  } catch (err) {
    console.error(`Error while getting size `, err.message);
    next(err);
  }
});

/* POST pizza-size */
router.post('/', auth, async function (req, res, next) {
  try {
    res.json(await pizzaSize.createSize(req.body));
  } catch (err) {
    console.error(`Error while creating new size`, err.message);
    next(err);
  }
});

/* PATCH pizza-size */
router.patch('/:id', auth, async function (req, res, next) {
  try {
    res.json(await pizzaSize.updateSize(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating size`, err.message);
    next(err);
  }
});

/* DELETE pizza-size */
router.delete('/:id', auth, async function (req, res, next) {
  try {
    res.json(await pizzaSize.deleteSize(req.params.id));
  } catch (err) {
    console.error(`Error while deleting size`, err.message);
    next(err);
  }
});

module.exports = router;
