export const AdminAuthLayout = ({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) => {
console.log("AdminAuthLayout: Rendering with title:", title);
    return (
        <div className="bg-transparent md:bg-card p-0 md:p-8 min-h-screen flex flex-col">
            <div className="bg-bg rounded-0 md:rounded-3xl border-0 md:border-4 border-transparent md:border-card p-8 grow flex flex-col">
                <div className="w-14.25 md:w-15.5 h-20 md:h-22 flex justify-center items-center mx-auto mb-6 md:mb-16">
                    <img
                        src="/images/logo-1.svg"
                        alt="ataa"
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="w-full md:w-132 mx-auto">
                    <div className="flex flex-col items-center md:items-start">
                        <h1 className="heading-5-bold md:heading-4-bold text-title mb-2 text-center md:text-start">
                            {title}                       
                             </h1>

                        <p className="text-regular-normal text-paragraph mb-6 md:mb-8 text-center md:text-start">
                            {description}                    
                                </p>
                    </div>

                    {children}

                </div>
            </div>
        </div>
    );
};

