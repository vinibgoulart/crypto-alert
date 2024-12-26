import { ReactNode } from "react";
import { Text, YStack } from "tamagui";

type SectionProps = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export const Section = ({ title, subtitle, children }: SectionProps) => {
  return (
    <YStack gap={"$3"}>
      <YStack>
        <Text fontSize={"$3"} fontWeight={"$6"}>
          {title}
        </Text>
        <Text fontSize={"$1"} fontWeight={"$4"} color={"$gray10"}>
          {subtitle}
        </Text>
      </YStack>
      {children}
    </YStack>
  );
};
