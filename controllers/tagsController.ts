import { Request, Response } from "express";
import { knexConnection } from "../connectionDatabase";

const getTags = async (req:Request, res:Response)=>{
    const {id} = req.params;
    
    const tags = await knexConnection('Tags').where({
        card_id: id    
    })

    console.log(tags)

    res.status(200).json({
        tags
    })
}

export default {
    getTags
}