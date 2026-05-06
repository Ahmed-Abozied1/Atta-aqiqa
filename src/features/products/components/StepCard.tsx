export const StepCard = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
    <div className="bg-bg p-4 rounded-2xl md:rounded-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)]! flex flex-col items-center gap-2 text-center">
        <div className="w-10 h-10 bg-primary text-bg rounded-full flex items-center justify-center text-regular-medium mb-0 md:mb-2">
            {number}
        </div>
        <h4 className="text-small-bold md:text-regular-bold text-title">{title}</h4>
        <p className="text-small-normal md:text-regular-normal text-paragraph">{desc}</p>
    </div>
);