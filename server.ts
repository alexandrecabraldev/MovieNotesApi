import express, { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { routes } from './routes/users.routes'
import { routesCards } from './routes/cards.routes'
import dotEnv from './verifyDotEnv'
import cors from "cors"
import { routerTags } from './routes/tags.routes'
import authentication from "./controllers/authenticationController"

interface User {
  id: number | string;
  name: string;
  email:string;
  profileImageUrl:string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express{
    interface Request {
      user: User
    }
  }
}

export const app = express();

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

export const secretJWT = 'iaçberyntçaieryt'

export function verifyAuth (req: Request, res: Response, next: NextFunction): void {

  const token = req.cookies.token
  
  if(!token){
    res.status(403).json({ message: 'User not authenticated' })
      return
  }
   
  try {
    const decoded = jwt.verify(token, secretJWT)

    req.user = decoded as User

  } catch (err) {
    res.status(401).json({
      message: 'invalid token'
    })
    return
  }

  next()
}

// export function verifyAuthSignin(req:Request, res:Response, next:NextFunction){

//   const token = req.cookies.token

//   if(!token){
//     res.status(403).json({ message: 'User not authenticated' })
//     return
//   }

//   try {
//     const decoded = jwt.verify(token, secretJWT)
  
//     req.user = decoded as User
   
//   } catch (err) {
//     res.status(401).json({
//       message: 'invalid token'
//     })
//     return
//   }

//   next()
// }

app.post('/auth', authentication.authenticationController)

app.use('/api', routes)
app.use('/api/cards',routesCards)
app.use('/api/tags', routerTags)

app.get('/', verifyAuth, (req, res) => {
  res.status(200).json({

    message: `Home Page ${req.user.name}, welcome to the mato`
  })
})

app.listen(dotEnv.PORT, () => {
  console.log(`running on port ${dotEnv.PORT}`)
})

app.post('/logout',(req, res)=>{
  res.clearCookie('token').status(200).json({
    message:"logout Sucess, you are now logged out"
  })
  
})
