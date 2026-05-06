import { ReactNode } from 'react';

interface ContentPageProps {
  title: string;
  children: ReactNode;
}

export default function ContentPage({ title, children }: ContentPageProps) {
  return (
    <div className="">
      <div className="container py-8 md:py-16">
          <div className="mb-4 md:mb-8 text-center">
            <h1 className="heading-4-bold md:heading-3-bold text-primary mt-20">{title}</h1>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-white rounded-2xl">
            <div className="p-8 md:p-12">
              <div className="text-paragraph text-regular-normal space-y-5">
                {children}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}