import { SVGProps } from 'react';

interface IconWrapperProps extends SVGProps<SVGSVGElement> {
    children: React.ReactNode;
    size?: number;
}

export const IconWrapper = ({
    children,
    size = 24,
    className,
    ...props
}: IconWrapperProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        {...props}
    >
        {children}
    </svg>
);