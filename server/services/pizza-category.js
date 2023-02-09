const db = require('./db');
const helper = require('../helper');

//getAll function returns all categories from the database
async function getAll() {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, name
     FROM category `
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//get function returns category by id from the database
async function get(id) {
  const rows = await db.query(
    `SELECT bin_to_uuid(id) as id, name
     FROM category 
     WHERE id=uuid_to_bin('${id}')`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

//create function inserts a new category into the databse
async function create(category) {
  const result = await db.query(
    `INSERT INTO category 
     (id, name)
     VALUES 
     (uuid_to_bin(uuid()), "${category.name}")`
  );

  let message = 'Error in creating new category';

  if (result.affectedRows) {
    message = 'New category is created successfully';
  }

  return { message };
}

//update function updates one category in the databse
async function update(id, category) {
  const result = await db.query(
    `UPDATE category 
     SET name="${category.name}"
     WHERE id=uuid_to_bin('${id}')`
  );

  let message = 'Error in updating category';

  if (result.affectedRows) {
    message = 'Category updated successfully';
  }

  return { message };
}

//remove function deletes one category in the databse
async function remove(id) {
  const result = await db.query(
    `DELETE FROM category WHERE id=uuid_to_bin('${id}')`
  );

  let message = 'Error in deleting category';

  if (result.affectedRows) {
    message = 'Category is deleted successfully';
  }

  return { message };
}

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
