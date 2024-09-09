import { randomUUID } from "crypto";
import { knexConnection } from "../connectionDatabase";

export interface Card{
    id?:string,
    title:string,
    rating:string|number,
    summary:string,
    user_id:string
}

export class CardRepository{

    connectionDatabase = knexConnection;
    
    async createCard(table:string, card: Card){
        const {id,title,rating,summary,user_id} = card;

        const [cardReturned]:{id:string}[] = await this.connectionDatabase(table).insert({
            id: id ?? randomUUID(),
            title,
            rating,
            summary, 
            user_id,
        }).returning('id');

        return cardReturned;
    }


    async getCards(table:string, user_id: string| number){

        const cards = await this.connectionDatabase(table).where({
            user_id,
        }).returning("*");

        return cards;
    }

    
}

