const express = require('express');
const router = express.Router();

const category = require('../services/pizza-category');
const auth = require('../middleware/auth')

/* GET all categories. */
router.get('/', async function(req, res, next) {
    try {
      res.json(await category.getAll());
    } catch (err) {
      console.error(`Error while getting categories `, err.message);
      next(err);
    }
  });
  
/* GET category by id. */
router.get('/:id', async function(req, res, next) {
    try {
    res.json(await category.get(req.params.id));
    } catch (err) {
    console.error(`Error while getting category `, err.message);
    next(err);
    }
});

/* POST new category */
router.post('/', auth, async function(req, res, next) {
    try {
      res.json(await category.create(req.body));
    } catch (err) {
      console.error(`Error while creating new category`, err.message);
      next(err);
    }
  });

/* PUT category */
router.put('/:id', auth, async function(req, res, next) {
    try {
      res.json(await category.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating category`, err.message);
      next(err);
    }
  });

/* DELETE category */
router.delete('/:id', auth, async function(req, res, next) {
    try {
      res.json(await category.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting category`, err.message);
      next(err);
    }
  });


module.exports = router;