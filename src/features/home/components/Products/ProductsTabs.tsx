import { cn } from '@/lib/utils'
import { ProductsTabsProps } from '@/lib/types/types'

export const ProductsTabs = ({ activeTab, setActiveTab }: ProductsTabsProps) => {
  const handleTabClick = (tab: 'inside' | 'outside') => (e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(tab)
  }

  return (
    <div className="flex justify-center my-10 md:my-6">
      <div className="flex gap-2 p-1">
        <button
          onClick={handleTabClick('inside')}
          className={cn(
            "px-4 md:px-6 py-2.25 rounded-lg md:rounded-2xl border border-primary text-small-bold! md:text-medium-bold transition-all cursor-pointer",
            "hover:bg-primary/10 hover:text-primary",
            activeTab === 'inside'
              ? "bg-primary text-bg border-0"
              : "text-paragraph"
          )}
        >
          داخل مصر
        </button>

        <button
          onClick={handleTabClick('outside')}
          className={cn(
            "px-4 md:px-6 py-2.25 rounded-lg border border-primary md:rounded-2xl text-small-bold! md:text-medium-bold transition-all cursor-pointer",
            "hover:bg-primary/10 hover:text-primary",
            activeTab === 'outside'
              ? "bg-primary text-bg border-0"
              : "text-paragraph"
          )}
        >
          في أفريقيا
        </button>
      </div>
    </div>
  )
}