import { type Request, type Response } from 'express'
import { knexConnection } from '../connectionDatabase'
import jwt from 'jsonwebtoken'
import { dotEnv } from '../dotEnv'

async function authenticationController (req: Request, res: Response) {
  console.log(req.body)

  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({
      message: 'User and password need to be completed'
    })
  } else {
    const user = await knexConnection('Users').where({
      email,
      password
    }).first()

    if (user) {
      jwt.sign({ id: user.id, email: user.email, name: user.name, profileImageUrl: user.profileImageUrl }, dotEnv.JWTSECRET, {
        expiresIn: '24h'
      }, (error, token) => {
        if (error) {
          return res.status(400).json({
            message: 'internal error'
          })
        }

        res.cookie('token', token, {
          // httpOnly: true,
          maxAge: 1000 * 60 * 60 // 1 hora autenticado

        })

        res.status(200).redirect('/')
      })
    } else {
      return res.status(400).json({
        message: 'email or password incorrect'
      })
    }
  }
}

export default {
  authenticationController
}
