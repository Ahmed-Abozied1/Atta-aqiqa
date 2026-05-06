import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  item: typeof import("../../constants/faq-data").FAQ_DATA[number];
}

export const FAQItem = ({ item }: Props) => {
  return (
    <AccordionItem
      value={item.id}
      className="rounded-2xl md:rounded-3xl h-full border-0 flex flex-col   group shrink-0 data-[state=open]:shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]!"
    >
      <AccordionTrigger className="p-4 md:p-6 hover:no-underline">
        <span className="text-medium-bold md:text-large-bold text-title text-right">
          {item.question}
        </span>
      </AccordionTrigger>
      <div className="overflow-hidden rounded-b-2xl md:rounded-b-3xl h-full flex flex-col">
        <AccordionContent
          className="
    flex-1
    overflow-hidden
    data-[state=open]:opacity-100
    data-[state=closed]:opacity-0
    transition-opacity duration-300
  "
        >
          <div className="h-full p-4 md:p-6 text-paragraph text-small-normal md:text-medium-normal">
            {item.answer}
          </div>
        </AccordionContent>
      </div>

    </AccordionItem>
  );
};