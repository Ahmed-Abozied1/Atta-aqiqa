import { useState, useEffect, useCallback } from 'react'
import { AccountsFilters, PaginatedUsers, User } from '../types/accounts.types'
import { accountsService } from '../services/accounts.service'
import { ITEMS_PER_PAGE } from '../constants/accounts.constants'

const initialFilters: AccountsFilters = {
  searchTerm: '',
  role: 'all',
  status: 'all',
  sortBy: 'newest',
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

export function useAccounts() {
  const [data, setData] = useState<PaginatedUsers | null>(null)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<AccountsFilters>(initialFilters)

  const debouncedSearch = useDebounce(filters.searchTerm, 500)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await accountsService.fetchAll(
        currentPage,
        ITEMS_PER_PAGE,
        debouncedSearch,
        filters.role,
        filters.status,
        filters.sortBy
      )
      setData(response)
      
      const all = await accountsService.fetchAllUsers(
        debouncedSearch,
        filters.role,
        filters.status,
        filters.sortBy
      )
      setAllUsers(all)
    } catch {
      setData(null)
      setAllUsers([])
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, debouncedSearch, filters.role, filters.status, filters.sortBy])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked && data?.users) {
      setSelectedRows(data.users.map(user => user.id))
    } else {
      setSelectedRows([])
    }
  }, [data?.users])

  const handleSelectRow = useCallback((id: string, checked: boolean) => {
    setSelectedRows(prev =>
      checked ? [...prev, id] : prev.filter(rowId => rowId !== id)
    )
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
    setCurrentPage(1)
  }, [])

  const updateFilter = useCallback(<K extends keyof AccountsFilters>(
    key: K,
    value: AccountsFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }, [])

  return {
    users: data?.users || [],
    allUsers: allUsers,
    isLoading,
    selectedRows,
    currentPage,
    totalPages: data?.totalPages || 1,
    filters,
    itemsPerPage: ITEMS_PER_PAGE,
    handleSelectAll,
    handleSelectRow,
    resetFilters,
    updateFilter,
    setCurrentPage,
    refetch: fetchUsers
  }
}