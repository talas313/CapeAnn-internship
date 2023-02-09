const express = require('express');
const router = express.Router();

const orderDetails = require('../services/order-details.js');
const auth = require('../middleware/auth.js');

//GET method
router.get('/', async function (req, res, next) {
  try {
    res.json(await orderDetails.getAllOrderDetails());
  } catch (error) {
    console.error('Error while getting order details', error.message);
    next(error);
  }
});

/*GET by ID method */
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await orderDetails.getOrderDetails(req.params.id));
  } catch (err) {
    console.error('Error while getting order details', err.message);
    next(err);
  }
});

//POST method
router.post('/', auth, async function (req, res, next) {
  try {
    res.json(await orderDetails.createOrderDetails(req.body));
  } catch (err) {
    console.error(`Error while creating new order details`, err.message);
    next(err);
  }
});

//PUT method
router.put('/:id', auth, async function (req, res, next) {
  try {
    res.json(await orderDetails.updateOrderDetails(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating order details`, err.message);
    next(err);
  }
});

//DELETE method
router.delete('/:id', auth, async function (req, res, next) {
  try {
    res.json(await orderDetails.removeOrderDetails(req.params.id));
  } catch (err) {
    console.error(`Error while deleting order details`, err.message);
    next(err);
  }
});

module.exports = router;
