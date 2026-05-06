interface AuthHeaderProps {
    title?: string;
    subtitle?: string;
}

export const AuthHeader = ({
    title,
    subtitle
}: AuthHeaderProps) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-title heading-5-bold md:heading-4-bold">
                {title}
            </h2>
            <p className="text-paragraph text-regular-normal md:text-large-normal">
                {subtitle}
            </p>
        </div>
    );
};