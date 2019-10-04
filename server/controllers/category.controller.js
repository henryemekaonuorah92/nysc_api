import Category from '../models/category.model';

/**
 * Load Category and append to req.
 */
function load(req, res, next, id) {
  Category.get(id)
    .then((category) => {
      req.category = category; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get Category
 * @returns {Category}
 */
function get(req, res) {
  return res.json(req.category);
}

/**
 * Create new Category
 * @property {string} req.body.name - The name of Category.
 * @returns {Category}
 */
function create(req, res, next) {
  const category = new Category({
    name: req.body.name
  });

  category.save()
    .then(savedCategory => res.json(savedCategory))
    .catch(e => next(e));
}

/**
 * Update existing Category
 * @property {string} req.body.name - The name of Category.
 * @returns {Category}
 */
function update(req, res, next) {
  const category = req.category;
  category.name = req.body.name;

  category.save()
    .then(savedCategory => res.json(savedCategory))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of Categories to be skipped.
 * @property {number} req.query.limit - Limit number of Categories to be returned.
 * @returns {Category[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Category.list({ limit, skip })
    .then(categories => res.json(categories))
    .catch(e => next(e));
}

/**
 * Delete Category.
 * @returns {Category}
 */
function remove(req, res, next) {
  const category = req.category;
  category.remove()
    .then(deletedCategory => res.json(deletedCategory))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
