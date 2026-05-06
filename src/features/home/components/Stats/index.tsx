import { StatsList } from "./StatsList";
import { StatImage } from "./StatImage";
import { Badge } from "@/components/common/Badge";

export function Stats() {
  return (
    <section className="relative w-full flex items-start md:items-center overflow-hidden min-h-193 md:min-h-138">
      <StatImage />
      <div className="absolute inset-0 bg-primary/50 z-1" />
      <div className="container relative z-10 py-8 md:py-16 flex flex-col items-center md:items-end">
        <div className="flex flex-col items-center">
          <Badge badge="إحصائيتنا"/>
          <h2 className="heading-5-bold md:heading-4-bold text-bg text-center w-full">
            ذبائح موثوقة وتوصيل مضمون
          </h2>
          <StatsList />
        </div>
      </div>
    </section>
  );
}