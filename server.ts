import express from 'express'
import cookieParser from 'cookie-parser'
import { routes } from './routes/users.routes'
import { routesCards } from './routes/cards.routes'
import {dotEnv} from './dotEnv'
import cors from "cors"
import { routerTags } from './routes/tags.routes'
import authentication from "./controllers/authenticationController"
import authenticationMiddlewate from "./middlewares/verifyAuthentication"

export interface User {
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
}));

app.use(express.json())
app.use(cookieParser())



app.post('/auth', authentication.authenticationController)

app.use('/api', routes)
app.use('/api/cards',routesCards)
app.use('/api/tags', routerTags)

app.get('/', authenticationMiddlewate.verifyAuthentication, (req, res) => {
  res.status(200).json({

    message: `Home Page ${req.user.name}, welcome`
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
