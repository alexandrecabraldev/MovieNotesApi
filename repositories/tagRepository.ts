import { randomUUID } from "crypto";
import { knexConnection } from "../connectionDatabase";

interface TagProps{
    table:string
    tags:string[]
    card_id:{id:string}
}

export class TagRepository{

    connectionDatabase =  knexConnection

    createTag(props: TagProps){

        const { table, tags, card_id }=props;

        tags.map(async (itemTag: string)=>{
            
            await this.connectionDatabase(table).insert({
                id: randomUUID(),
                tag:itemTag,
                card_id: card_id.id
            })
        })
    }
}