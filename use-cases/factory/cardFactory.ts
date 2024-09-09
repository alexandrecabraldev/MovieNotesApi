import { CardRepository } from '../../repositories/cardRepository'
import { TagRepository } from '../../repositories/tagRepository'
import { CardsUseCase } from '../cardsUseCase'

export function cardFactory () {
  const cardRepository = new CardRepository()
  const tagRepository = new TagRepository()
  const cardUseCase = new CardsUseCase(cardRepository, tagRepository)

  return cardUseCase
}
