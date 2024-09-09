import { knexConnection } from '../connectionDatabase'
import { type CreateUserType } from '../use-cases/interface/CreateUserInterface'

export class UserRepository {
  connectionDatabase = knexConnection
  
  async createUser (table: string, { id, name, email, password }: CreateUserType) {
    const resp = await this.connectionDatabase(table).insert({
      id,
      name,
      email,
      password
    }).returning('name')

    return resp
  }
}
