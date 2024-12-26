import { ReactNode } from "react";
import { Text, XStack, YStack } from "tamagui";

type SectionProps = {
  title: string;
  subtitle: string;
  right?: ReactNode;
  children?: ReactNode;
};

export const Section = ({ title, subtitle, children, right }: SectionProps) => {
  return (
    <YStack gap={"$3"} flex={1}>
      <XStack justifyContent="space-between">
        <YStack>
          <Text fontSize={"$3"} fontWeight={"$6"}>
            {title}
          </Text>
          <Text fontSize={"$1"} fontWeight={"$4"} color={"$gray11"}>
            {subtitle}
          </Text>
        </YStack>
        {right}
      </XStack>
      {children}
    </YStack>
  );
};
