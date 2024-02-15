import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }): JSX.Element => {
  return <div className="max-w-[1216px] mx-auto">{children}</div>;
};

export default Container;
