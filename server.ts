import express, { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { routes } from './routes/users.routes'
import { routesCards } from './routes/cards.routes'
import dotEnv from './verifyDotEnv'
import { knexConnection } from './connectionDatabase'
import cors from "cors"
import { routerTags } from './routes/tags.routes'

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

export const app = express()
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())

export const secretJWT = 'iaçberyntçaieryt'

export function verifyAuth (req: Request, res: Response, next: NextFunction): void {
  // const token=req.headers.authorization
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

app.post('/auth', async (req, res) => {
  console.log(req.body)
  
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({
      message: 'User and password need to be completed'
    })
  } else {
    const user = await knexConnection('Users').where({
      email,
      password,
    }).first()

    if (user) {
    
      jwt.sign({ id: user.id, email: user.email, name: user.name, profileImageUrl: user.profileImageUrl }, secretJWT, {
        expiresIn: '24h'
      }, (error, token) => {
      
        if (error) {
          return res.status(400).json({
            message: 'internal error'
          })
        }
        
        res.cookie('token', token, {
          //httpOnly: true,
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
})

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
