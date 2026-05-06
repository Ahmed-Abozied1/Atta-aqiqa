export const AttributeRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-2 gap-1 border-border border text-title rounded-lg md:rounded-lg mb-2 overflow-hidden"
  >
     <div className="py-3.25 md:py-4 px-3 md:px-3 text-small-medium md:text-regular-medium bg-card">
      {label}
    </div>

    <div className="py-4 px-3 text-small-normal md:text-regular-normal bg-bg">
      {value}
    </div>
  </div>
); 