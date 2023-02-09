const express = require('express')
const router = express.Router()

const users = require('../services/users')
const auth = require('../middleware/auth')

/* GET users. */
router.get('/', auth, async function(req, res, next) {
  try {
    res.json(await users.getUsers())
  } catch (err) {
    console.error(`Error while getting users `, err.message)
    next(err)
  }
})

/* POST register user */
router.post('/register', async function(req, res, next) {
  try {
    res.json(await users.registerUser(req.body))
  } catch (err) {
    console.error(`Error while registering user`, err.message)
    next(err)
  }
})

/* POST login user */
router.post('/login', async function(req, res, next) {
  try {
    res.json(await users.loginUser(req.body))
  } catch (err) {
    console.error(`Error while logging`, err.message)
    next(err)
  }
})

/* PATCH user */
router.patch('/:id', auth, async function(req, res, next) {
  try {
    res.json(await users.updateUser(req.params.id, req.body))
  } catch (err) {
    console.error(`Error while updating user`, err.message)
    next(err)
  }
})

/* DELETE user */
router.delete('/:id', auth, async function(req, res, next) {
  try {
    res.json(await users.deleteUser(req.params.id))
  } catch (err) {
    console.error(`Error while deleting user`, err.message)
    next(err)
  }
})

module.exports = router