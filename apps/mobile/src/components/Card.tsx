import { ReactNode } from "react";
import { Card as _Card, Text } from "tamagui";

type CardProps = {
  title: string;
  children: ReactNode;
};

export const Card = ({ title, children }: CardProps) => {
  return (
    <_Card padding={"$3"} backgroundColor={"$secondaryDark"}>
      <Text color={"$gray11"} fontSize={"$0.5"}>
        {title}
      </Text>
      {children}
    </_Card>
  );
};
