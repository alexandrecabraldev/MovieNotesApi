import { randomUUID } from 'crypto'
import { type CardRepository, type Card } from '../repositories/cardRepository'
import { type TagRepository } from '../repositories/tagRepository'

export class CardsUseCase {
  constructor (
    private readonly cardrepository: CardRepository,
    private readonly tagRepository: TagRepository
  ) {}

  private readonly table = 'Cards'
  private readonly tagTable = 'Tags'

  async createCard (card: Card, tags: string[]) {
    const cardReturning = await this.cardrepository.createCard(this.table, card)

    console.log(cardReturning)

    this.tagRepository.createTag({
      table: this.tagTable,
      tags,
      card_id: cardReturning
    })
  }

  async getCards (user_id: string | number) {
    const cards = await this.cardrepository.getCards(this.table, user_id)

    return cards
  }
}
