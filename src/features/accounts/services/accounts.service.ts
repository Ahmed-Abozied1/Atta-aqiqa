import { getData } from '@/lib/getData'
import { PaginatedUsers, User } from '../types/accounts.types'

export const accountsService = {
  async fetchAll(
    page = 1,
    limit = 10,
    searchTerm = '',
    role = 'all',
    status = 'all',
    sortBy = 'newest'
  ): Promise<PaginatedUsers> {
    const query = `users?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role=${role}&status=${status}&sortBy=${sortBy}`
    return await getData<PaginatedUsers>(query)
  },

  async fetchAllUsers(
    searchTerm = '',
    role = 'all',
    status = 'all',
    sortBy = 'newest'
  ): Promise<User[]> {
    const query = `users?getAll=true&searchTerm=${searchTerm}&role=${role}&status=${status}&sortBy=${sortBy}`
    const response = await getData<{ users: User[] }>(query)
    return response.users
  }
}