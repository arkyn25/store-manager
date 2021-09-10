const express = require('express');

const rescue = require('express-rescue');
const services = require('../services/productService');

const router = express.Router();

const STATUS_FAIL = 422;
const STATUS_CREATED = 201;
const STATUS_OK = 200;

router.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;
    
    const newProduct = await services.newProducts(name, quantity);

    if (newProduct.err) return res.status(STATUS_FAIL).json(newProduct);

    return res.status(STATUS_CREATED).json(newProduct);
  }),
);

router.get(
  '/',
  rescue(async (req, res) => {
    const getProduct = await services.getProducts();
    return res.status(STATUS_OK).json(getProduct);
  }),
);

router.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const findId = await services.findProduct(id);

    if (findId.err || findId === null) return res.status(STATUS_FAIL).json(findId);

    return res.status(STATUS_OK).json(findId);
  }),
);

router.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updateProduct = await services.updateProduct(id, name, quantity);

    if (updateProduct.err) return res.status(STATUS_FAIL).json(updateProduct);

    return res.status(STATUS_OK).json(updateProduct);
  }),
);

router.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
  const deletedProduct = await services.deleteProduct(id);

  if (deletedProduct.err) return res.status(STATUS_FAIL).json(deletedProduct);

  return res.status(STATUS_OK).json(deletedProduct);
  }),
);

module.exports = router;