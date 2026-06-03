const validateProduct = (req, res, next) => {
  const { productTitle, productPrice, availableQuantity } = req.body

  if (!productTitle || productTitle.trim() === '') {
    return res.status(400).json({ message: 'Le titre du produit est requis' })
  }

  if (!productPrice || isNaN(productPrice) || Number(productPrice) < 0) {
    return res.status(400).json({ message: 'Le prix doit être un nombre positif' })
  }

  if (availableQuantity !== undefined && (isNaN(availableQuantity) || Number(availableQuantity) < 0)) {
    return res.status(400).json({ message: 'La quantité doit être un nombre positif' })
  }

  next()
}

module.exports = { validateProduct }