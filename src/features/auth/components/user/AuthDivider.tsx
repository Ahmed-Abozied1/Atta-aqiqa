export const AuthDivider = () => {
    return (
        <div className="relative w-full text-border" aria-hidden="true">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white text-paragraph text-regular-normal md:text-large-normal px-2"> أو        </span>
            </div>
        </div>
    );
};