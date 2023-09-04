import express from 'express'
import { getThumb } from '../controllers/images'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('View README')
})

router.get('/images', getThumb)

export default router
