import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface AppBreadcrumbProps {
  items: BreadcrumbItemType[];
  className?: string;
}

export const AppBreadcrumb = ({ items }: AppBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="bg-primary px-4 md:px-6 py-3 md:py-3.75 rounded-xl md:rounded-2xl w-fit gap-0! z-10!">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="text-regular-bold! md:text-medium-bold! text-bg px-2">
              {index === items.length - 1 ? (
                <BreadcrumbPage className=" text-regular-bold! md:text-medium-bold!">{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href} asChild>
                  <Link href={item.href || '#'} className="">
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {index < items.length - 1 && (
              <BreadcrumbSeparator className="">
                <ChevronLeft className="w-6! h-6! text-bg" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};