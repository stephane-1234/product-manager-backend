const pool = require('../config/db')
const { v4: uuidv4 } = require('uuid')

const getAll = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product ORDER BY productTitle')
    res.json(rows)
  } catch (err) {
    next(err)
  }
}

const getOne = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM product WHERE productId = ?',
      [req.params.id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produit non trouvé' })
    }
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const { productTitle, productDescription, productPrice, availableQuantity } = req.body
    const productId = uuidv4()
    const productThumbnail = req.file ? req.file.filename : null

    await pool.query(
      'INSERT INTO product (productId, productTitle, productDescription, productPrice, availableQuantity, productThumbnail) VALUES (?, ?, ?, ?, ?, ?)',
      [productId, productTitle, productDescription, Number(productPrice), Number(availableQuantity) || 0, productThumbnail]
    )

    const [rows] = await pool.query('SELECT * FROM product WHERE productId = ?', [productId])
    res.status(201).json(rows[0])
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const { productTitle, productDescription, productPrice, availableQuantity } = req.body
    const productThumbnail = req.file ? req.file.filename : undefined

    const fields = { productTitle, productDescription, productPrice: Number(productPrice), availableQuantity: Number(availableQuantity) }
    if (productThumbnail) fields.productThumbnail = productThumbnail

    const keys = Object.keys(fields)
    const values = Object.values(fields)

    await pool.query(
      `UPDATE product SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE productId = ?`,
      [...values, req.params.id]
    )

    const [rows] = await pool.query('SELECT * FROM product WHERE productId = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ message: 'Produit non trouvé' })
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM product WHERE productId = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ message: 'Produit non trouvé' })

    await pool.query('DELETE FROM product WHERE productId = ?', [req.params.id])
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getOne, create, update, remove }