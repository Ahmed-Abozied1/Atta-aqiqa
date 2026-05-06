"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItem } from "@/features/home/components/FAQ/FAQItem";
import { FAQ_DATA } from "@/lib/constants";

export const ProductFAQ = () => {
    return (
        <div className="">
            <h3 className="heading-6-bold md:heading-5-bold text-title mb-2 md:mb-4">الاستفسارات</h3>
            <Accordion
                type="multiple"
                defaultValue={["fq-1", "fq-2"]}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-10 items-start"
            >
                {FAQ_DATA.map((item) => (
                    <FAQItem key={item.id} item={item} />
                ))}
            </Accordion>
        </div>
    );
};