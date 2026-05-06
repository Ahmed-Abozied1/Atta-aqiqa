import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { Order, OrdersFilters } from '../types/orders.types'
import { INTENT_LABELS, STATUS_LABELS } from '../constants'

export const formatOrderDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ar })
}

export const getIntentLabel = (intent: string): string => {
  return INTENT_LABELS[intent] || intent
}

export const getStatusLabel = (status: string): string => {
  return STATUS_LABELS[status] || status
}

export const filterOrders = (orders: Order[], filters: OrdersFilters): Order[] => {
  let filtered = [...orders]

  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase()
    filtered = filtered.filter(order =>
      order.orderNumber.toString().includes(searchLower) ||
      order.user.name.toLowerCase().includes(searchLower) ||
      order.user.email.toLowerCase().includes(searchLower) ||
      order.user.phone?.includes(filters.searchTerm) ||
      order.product.name.toLowerCase().includes(searchLower)
    )
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(order => order.status === filters.status)
  }

  return filtered
}

export const prepareOrdersExportData = (orders: Order[]) => {
  return orders.map(order => ({
    'رقم الطلب': order.orderNumber,
    'العميل': order.user.name,
    'البريد الإلكتروني': order.user.email,
    'رقم الهاتف': order.user.phone || '-',
    'المنتج': order.product.name,
    'النية': getIntentLabel(order.intent),
    'السعر': order.totalPrice,
    'الحالة': getStatusLabel(order.status),
    'تاريخ الطلب': formatOrderDate(order.createdAt),
  }))
}

export const convertToCSV = (data: Record<string, unknown>[]): string => {
  if (data.length === 0) return ''
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => JSON.stringify(row[header])).join(',')
    ),
  ]
  return csvRows.join('\n')
}

export const downloadCSV = (csv: string, filename: string): void => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}