const db = require('./db')
const helper = require('../helper')

//getRatings function returns all pizza-ratings from the database
async function getRatings() {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, rating, bin_to_uuid(pizzaId) as pizzaId 
     FROM pizza_rating`
  )
  const data = helper.emptyOrRows(rows)

  return {
    data,
  }
}

//getRatingByPizzaId function returns pizza-rating by pizzaId from the database
async function getRatingByPizzaId(pizzaId) {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, rating, bin_to_uuid(pizzaId) as pizzaId 
     FROM pizza_rating 
     WHERE pizzaId = uuid_to_bin(?)`,
    [pizzaId]
  )
  const data = helper.emptyOrRows(rows)

  return {
    data,
  }
}

//createRating function inserts a new pizza-rating into the database
async function createRating(pizzaRating) {
  const result = await db.query(
    `INSERT INTO pizza_rating(id, rating, pizzaId) 
     VALUES(uuid_to_bin(uuid()),?,uuid_to_bin(?))`,
    [pizzaRating.rating, pizzaRating.pizzaId]
  )

  let message = 'Error in creating new rating'

  if (result.affectedRows) {
    message = 'New rating is created successfully'
  }

  return { message }
}

//updateRating function updates one pizza-rating in the database
async function updateRating(id, pizzaRating) {
  const result = await db.query(
    `UPDATE pizza_rating 
     SET rating = ?, pizzaId = uuid_to_bin(?) 
     WHERE id = uuid_to_bin(?)`,
    [pizzaRating.rating, pizzaRating.pizzaId, id]
  )

  let message = 'Error in updating rating'

  if (result.affectedRows) {
    message = 'Rating updated successfully'
  }

  return { message }
}

//deleteRating function deletes one pizza-rating in the database
async function deleteRating(id) {
  const result = await db.query(
    `DELETE FROM pizza_rating WHERE id = uuid_to_bin(?)`,
    [id]
  )

  let message = 'Error in deleting rating'

  if (result.affectedRows) {
    message = 'Rating deleted successfully'
  }

  return { message }
}

module.exports = {
  getRatings,
  getRatingByPizzaId,
  createRating,
  updateRating,
  deleteRating,
}
