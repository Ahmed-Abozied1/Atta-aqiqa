import { Stat } from "../../types";

export const StatItem = ({ stat }: { stat: Stat }) => {
    return (
    <div className="flex flex-col items-center justify-center py-4 px-4 md:px-8 ">
        <span className="heading-4-bold md:heading-3-bold text-secondary text-center leading-none">
            {stat.value}
        </span>
        <span className="text-regular-bold sm:text-medium-bold md:text-large-bold mt-2 text-[#DCEBE3] text-center">
            {stat.label}
        </span>
    </div>
);
}