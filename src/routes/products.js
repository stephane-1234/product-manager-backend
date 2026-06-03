const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { getAll, getOne, create, update, remove } = require('../controllers/products')
const { validateProduct } = require('../middleware/validate')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/
    const ext = allowed.test(path.extname(file.originalname).toLowerCase())
    if (ext) cb(null, true)
    else cb(new Error('Seules les images sont acceptées'))
  },
  limits: { fileSize: 5 * 1024 * 1024 }
})

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', upload.single('productThumbnail'), validateProduct, create)
router.put('/:id', upload.single('productThumbnail'), validateProduct, update)
router.delete('/:id', remove)

module.exports = router