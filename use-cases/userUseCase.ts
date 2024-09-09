import { type CreateUserType } from './interface/CreateUserInterface'
import { type UserRepository } from '../repositories/userRepository'
import { randomUUID } from 'crypto'

export class UserRepositoryUseCase {
  constructor (private readonly repository: UserRepository) {}

  private readonly table = 'Users'

  async createUser ({ name, email, password }: CreateUserType) {
    const resp = await this.repository.createUser(this.table, {
      id: randomUUID(),
      name,
      email,
      password
    })

    return resp
  }
}
