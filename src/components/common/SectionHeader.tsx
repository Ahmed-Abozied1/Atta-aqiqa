import { SectionHeaderProps } from "./section-header.types"
import {Badge} from "./Badge"
export const SectionHeader = ({ title, description, badge }:SectionHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-4 w-full max-w-85.75 md:max-w-199.5 mx-auto text-center">
      {badge && (
        <Badge badge={badge}/>
      )}
      <h2 className="heading-4-bold sm:heading-5-bold md:heading-3-bold text-title">{title}</h2>
      
      {description && (
        <p className="text-regular-normal md:heading-5-normal text-paragraph">{description}</p>
      )}
    </div>
  )
}
