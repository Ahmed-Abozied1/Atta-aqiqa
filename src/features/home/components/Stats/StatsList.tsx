import { STATS_DATA } from "../../constants/stat-data";
import { StatItem } from "./StatItem";

export const StatsList = () => (
    <div className="relative w-full mt-8 md:mt-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/20 -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-white/20 -translate-x-1/2" />

        <div className="grid grid-cols-2">
            {STATS_DATA.map((stat, index) => (
                <StatItem
                    key={index}
                    stat={stat}
                />
            ))}
        </div>
    </div>
);