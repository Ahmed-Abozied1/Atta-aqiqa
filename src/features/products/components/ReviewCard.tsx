import { Star } from "lucide-react";
interface ReviewCardProps {
    name: string;
    rating: number;
    comment: string;
    initial?: string;
}

export const ReviewCard = ({ name, rating, comment, initial = "A" }: ReviewCardProps) => {
    return (
        <div className="bg-bg p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)]! flex flex-col gap-4 md:gap-6 mb-6">
            <div className="flex items-center gap-2 md:gap-4">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-secondary text-bg rounded-full flex items-center justify-center heading-4">
                    {initial}
                </div>

                <div className="space-y-1">
                    <h4 className="text-medium-bold md:heading-6-bold text-title">{name}</h4>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`w-4 md:w-5 h-4 md:h-5 ${i < rating ? "text-rating" : "text-disabled"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-small-normal md:text-medium-normal text-paragraph">
                {comment}
            </p>
        </div>
    );
};