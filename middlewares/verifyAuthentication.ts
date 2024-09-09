import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { dotEnv } from '../dotEnv'
import { type UserRequest } from '../server'

function verifyAuthentication (req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.token

  if (!token) {
    res.status(403).json({ message: 'User not authenticated' })
    return
  }

  try {
    const decoded = jwt.verify(token, dotEnv.JWTSECRET)

    req.user = decoded as UserRequest
  } catch (err) {
    res.status(401).json({
      message: 'invalid token'
    })
    return
  }

  next()
}

export default {
  verifyAuthentication
}
