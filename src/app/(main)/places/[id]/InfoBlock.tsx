import { PropsWithChildren } from "react";

interface InfoBlockProps {
  title: string;
  Icon?: JSX.Element;
}

export const InfoBlock = ({
  Icon,
  children,
  title,
}: PropsWithChildren<InfoBlockProps>) => {
  return (
    <div className="bg-secondary-bg flex gap-md rounded-lg p-md items-center shadow-md">
      {Icon}
      <div className="">
        <p className="text-secondary-text text-sm leading-none">{title}</p>
        {children}
      </div>
    </div>
  );
};

