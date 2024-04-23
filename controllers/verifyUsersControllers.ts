import { type Request, type Response, type NextFunction } from 'express'
import { knexConnection } from '../connectionDatabase'

const verifyCreateUsers = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'user have contain name, email and password'
    })
  }

  const users = await knexConnection('Users').select('*');
  const isEmailEqual = users.some((item)=>item.email===email)

  if(isEmailEqual){
    return res.status(400).json({
      message:"Not possible duplicate email"
    })
  }

  next()
}

const verifyOldPassword = async (req:Request, res:Response, next:NextFunction)=>{
    
  const {oldPassword, newPassword} = req.body;
    
    if(!oldPassword && !newPassword){
      next()
      return
    }

    if(!oldPassword || !newPassword){
      res.status(400).json({
        message:"Old and new password is required "
      })
      return
    }

    const user =await knexConnection('Users').where({
      id:req.user.id,
      password:oldPassword
    }).first()
    
    console.log(user)
    if(!user){
      return res.status(400).json({
        message:'Incorrect old password'
      })
    }

    next()
}


export default {
  verifyCreateUsers,verifyOldPassword
}
