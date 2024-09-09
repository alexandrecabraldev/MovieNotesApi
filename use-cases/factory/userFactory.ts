import { UserRepositoryUseCase } from '../userUseCase'
import { UserRepository } from '../../repositories/userRepository';

export function userFactory () {
    const repository = new UserRepository();
    const userUseCase = new UserRepositoryUseCase(repository);

  return userUseCase;
}
