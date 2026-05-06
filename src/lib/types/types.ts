export interface SectionHeaderProps {
  title: string
  description?: string
  badge?: string
}


export interface ProductsTabsProps {
  activeTab: 'inside' | 'outside'
  setActiveTab: (tab: 'inside' | 'outside') => void
}