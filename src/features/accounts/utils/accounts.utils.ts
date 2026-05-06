import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { ROLE_LABELS } from '../constants/accounts.constants'
import { AccountsFilters, User } from '../types/accounts.types'

export const formatUserDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd/MM/yyyy', { locale: ar })
}

export const getRoleLabel = (role: string): string => {
  return ROLE_LABELS[role as keyof typeof ROLE_LABELS] || role
}

export const filterUsers = (users: User[], filters: AccountsFilters): User[] => {
  let filtered = [...users]

  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase()
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone?.includes(filters.searchTerm)
    )
  }

  if (filters.role && filters.role !== 'all') {
    filtered = filtered.filter(user => user.role === filters.role)
  }

  if (filters.status && filters.status !== 'all') {
    const isActive = filters.status === 'active'
    filtered = filtered.filter(user => user.emailVerified === isActive)
  }

  return filtered
}

export const prepareUsersExportData = (users: User[]) => {
  return users.map(user => ({
    'الاسم': user.name,
    'البريد الإلكتروني': user.email,
    'رقم الهاتف': user.phone || '-',
    'الحالة': user.emailVerified ? 'نشط' : 'غير نشط',
    'الدور': getRoleLabel(user.role),
    'تاريخ التسجيل': formatUserDate(user.createdAt),
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