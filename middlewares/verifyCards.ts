import { NextFunction, Request, Response } from "express";

const verifyCardInformation= (req:Request,res:Response, next:NextFunction)=>{
    
    const { title, rating, summary, tags } :
    {title:string,rating:string, summary:string, tags:string[]}
    = req.body;

        if(!title || !rating || !summary || !tags){
            res.status(400).json({
                message: 'Incomplete information for Card'
            })
            return
        }

        next();
}

export default{
    verifyCardInformation
}