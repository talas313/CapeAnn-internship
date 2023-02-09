const express = require('express');
const router = express.Router();

const pizza = require('../services/pizza');
const auth = require('../middleware/auth')

/* GET pizzas. */
router.get('/', async function(req, res, next) {
  try {
    if (req.query.search === '' || req.query.search === undefined) {
      res.json(await pizza.getAll());
    } else {
      res.json(await pizza.search(req.query.search));
    }
    
  } catch (err) {
    console.error(`Error while getting pizzas `, err.message);
    next(err);
  }
});

/* GET pizza by id. */
router.get('/:id', async function(req, res, next) {
    try {
      res.json(await pizza.get(req.params.id));
    } catch (err) {
      console.error(`Error while getting pizza `, err.message);
      next(err);
    }
  });

/* GET pizza by category. */
router.get('/category/:id', async function(req, res, next) {
    try {
      res.json(await pizza.getByCategory(req.params.id));
    } catch (err) {
      console.error(`Error while getting pizzas by category `, err.message);
      next(err);
    }
  });

/* POST pizza */
router.post('/', auth, async function(req, res, next) {
    try {
      res.json(await pizza.create(req.body));
    } catch (err) {
      console.error(`Error while creating new pizza`, err.message);
      next(err);
    }
  });

/* PUT pizza */
router.put('/:id', auth, async function(req, res, next) {
    try {
      res.json(await pizza.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating pizza`, err.message);
      next(err);
    }
  });

/* DELETE pizza */
router.delete('/:id', auth, async function(req, res, next) {
    try {
      res.json(await pizza.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting pizza`, err.message);
      next(err);
    }
  });

module.exports = router;