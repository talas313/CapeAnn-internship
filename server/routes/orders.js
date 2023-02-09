const express = require('express');
const router = express.Router();

const orders = require('../services/orders');
const auth = require('../middleware/auth');

// GET orders
router.get('/', async function (req, res, next) {
  try {
    res.json(await orders.getAll());
  } catch (err) {
    console.error('Error while getting orders ', err.message);
    next(err);
  }
});

//GET order by id from
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await orders.getOrder(req.params.id));
  } catch (err) {
    console.error('Error while getting order', err.message);
    next(err);
  }
});

//POST order
router.post('/', auth, async function (req, res, next) {
  try {
    res.json(await orders.createOrder(req.body));
  } catch (err) {
    console.error('Error while creating order ', err.message);
    next(err);
  }
});

//PUT order
router.put('/:id', auth, async function (req, res, next) {
  try {
    res.json(await orders.updateOrder(req.params.id, req.body));
  } catch (err) {
    console.error('Error while updating order ', err.message);
    next(err);
  }
});

//DELETE order by id
router.delete('/:id', auth, async function (req, res, next) {
  try {
    res.json(await orders.removeOrder(req.params.id));
  } catch (err) {
    console.error('Error while deleting order ', err.message);
    next(err);
  }
});

module.exports = router;
