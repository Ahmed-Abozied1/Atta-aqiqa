import { Accordion } from "@/components/ui/accordion"
import { FAQ_DATA } from "../../constants/faq-data"
import { FAQItem } from "./FAQItem"

export const FAQList = () => {
  return (
    <Accordion
      type="multiple"
      defaultValue={["fq-1", "fq-2"]}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10 " 
    >
      {FAQ_DATA.map((item) => (
        <FAQItem key={item.id} item={item} />
      ))}
    </Accordion>
  )
}