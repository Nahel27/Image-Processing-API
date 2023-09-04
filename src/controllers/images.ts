import type express from 'express'
import { access } from 'fs'
import path from 'path/posix'
import sharp from 'sharp'

const getThumb = (req: express.Request, res: express.Response): void => {
  const { filename, width, height } = req.query
  const f = filename as string
  const w = width as string
  const h = height as string
  try {
    if (f === undefined) {
      throw new Error('Please input a filename')
    }
  } catch (error) {
    res.send(String(error))
    return
  }
  const [name, extension] = f.split('.')
  const resultName = `${name}-${w}x${h}.${extension}`

  access(`./assets/thumb/${resultName}`, async (err) => {
    if (err) {
      try {
        if (!f) {
          throw new Error('Please input a filename')
        }
        if (!Number(width) || !Number(height)) {
          throw new Error(
            'Please input the width and height as integers greater than 0',
          )
        }
        await sharp(`./assets/full/${f}`)
          .resize(Number(width), Number(height))
          .toFile(`./assets/thumb/${resultName}`)
        res.sendFile(`./assets/thumb/${resultName}`, {
          root: 'C:/Users/nahel/Documents/Code/Project 1',
        })
      } catch (error) {
        res.send(String(error))
      }
    } else {
      res.sendFile(`./assets/thumb/${resultName}`, {
        root: path.join(__dirname, '..'),
      })
    }
  })
}

export { getThumb }
