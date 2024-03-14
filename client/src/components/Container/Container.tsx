import { FC } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }): JSX.Element => {
  return <section className="max-w-[1216px] mx-auto">{children}</section>;
};

export default Container;
