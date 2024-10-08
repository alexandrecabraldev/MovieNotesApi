import { Request, Response } from "express"
import { knexConnection } from "../connectionDatabase";
import { cardFactory } from "../use-cases/factory/cardFactory";

const createCard = async (req:Request, res:Response)=>{
    
    const {title, rating, summary, tags}: 
    {title:string,rating:string, summary:string, tags:string[]} = req.body;

        // const [card]:{id:string}[] = await knexConnection('Cards').insert({
        //     id:randomUUID(),
        //     title,
        //     rating,
        //     summary, 
        //     user_id: req.user.id,
        // }).returning('id')

        // console.log(card)

        // tags.map( async (item:string)=>{
        //     await knexConnection('Tags').insert({
        //         id:randomUUID(),
        //         tag:item,
        //         card_id: card.id
        //     })
        // })

        const cardUseCase = cardFactory();

        // title:string,
        // rating:string|number,
        // summary:string,
        // user_id:string
        console.log(req.user.id);
        
        await cardUseCase.createCard({
            title,
            rating,
            summary,
            user_id: req.user.id
        }, tags)

        res.status(200).json({
            message: "Card created",
            information:{
                title,
                rating,
                summary
            }
        })
}

const getCardsUser = async (req: Request, res:Response)=>{

    const cardUseCase = cardFactory(); 
    const cards = await cardUseCase.getCards(req.user.id);

    res.status(200).json({
        cards,
    })
}

const searchCard = async (req:Request, res:Response)=>{

    const {title} = req.body;

    const cards = await knexConnection('Cards').where({
        title,
        user_id: req.user.id
    })

    res.status(200).json({
        cards
    })
}

export default {
    createCard, getCardsUser, searchCard
}