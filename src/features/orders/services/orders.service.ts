import { getData } from '@/lib/getData'
import { PaginatedOrders, Order } from '../types/orders.types'

export const ordersService = {
  async fetchAll(
    page = 1,
    limit = 10,
    searchTerm = '',
    status = 'all',
    orderType = 'all',
    bookingType = 'all',
    scope = 'all',
    sortBy = 'newest',
    archived = false
  ): Promise<PaginatedOrders> {
    const query = `orders?page=${page}&limit=${limit}&searchTerm=${searchTerm}&status=${status}&orderType=${orderType}&bookingType=${bookingType}&scope=${scope}&sortBy=${sortBy}&archived=${archived}`
    return await getData<PaginatedOrders>(query)
  },

  async updateStatus(id: string, status: string): Promise<Order> {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) {
      throw new Error('Failed to update order status')
    }
    return await response.json()
  },

  async archiveOrder(id: string): Promise<void> {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isArchived: true }),
    })
    if (!response.ok) throw new Error('Failed to archive order')
  },

  async deleteOrder(id: string): Promise<void> {
    const response = await fetch(`/api/orders/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to delete order')
  },
}
