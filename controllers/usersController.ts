import { type Request, type Response } from 'express'
import { knexConnection } from '../connectionDatabase'
import  jwt from "jsonwebtoken"
import { dotEnv } from '../dotEnv'
import { userFactory } from '../use-cases/factory/userFactory'

const createUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userRepository = userFactory();

  userRepository.createUser({
    name,
    email,
    password
  });

  res.status(200).json({
    message: 'user created'
  })
}

const getAllUsers = async (req: Request, res: Response) => {

  const users = await knexConnection('Users').select('*')

  res.status(200).json({
    users
  })
}

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await knexConnection('Users').where({
    id,
  }).first().catch(err=>console.error(err))

  if(!user){
    res.status(200).json({
      message:'user not found'
    })
    return
  }

  res.status(200).json({
    user
  })
}

const updateUserInformation = async (req:Request, res:Response)=>{

    const data = req.body
    const dataUpdate = {
      name: data.name,
      password:data.newPassword
    }

    const {id, email, profileImageUrl} = req.user;

    await knexConnection('Users').where({
      id: req.user.id,
      // password: oldPassword
    })

    .update(dataUpdate)
 
    jwt.sign({
      id, 
      email,
      profileImageUrl,  
      name: data.name,
    },dotEnv.JWTSECRET,(error:Error | null, newToken:string | undefined)=>{
      if(error){
        return res.status(400).json({
          message:'failed auhentication'
        })
      }

      res.cookie('token', newToken,{
        httpOnly:true,
        maxAge: 1000 * 60 * 60, // 1 hora autenticado
      }).status(200).json({
        message:'User updated'
      })

    })
}

const getUserAuthenticated = (req:Request, res: Response)=>{
  res.json(req.user)
}

export default {
  createUser,
  getAllUsers,
  getUser,
  updateUserInformation,
  getUserAuthenticated
}