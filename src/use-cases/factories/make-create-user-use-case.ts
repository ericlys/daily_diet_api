import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new CreateUserUseCase(usersRepository)

  return authenticateUseCase
}
