import { FC } from "react";

interface ModalHeaderProps {
  title: string;
  description?: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
  title,
  description,
}) => {
  return (
  <div className="my-6 md:my-8">
        <h3 className="heading-6-bold md:heading-4-bold text-title mb-2 ">
        {title}
      </h3>

      {description && (
        <p className="text-regular-normal md:text-large-normal text-paragraph">
          {description}
        </p>
      )}
    </div>
  );
};