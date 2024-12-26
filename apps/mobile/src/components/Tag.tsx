import { ReactNode } from "react";
import { View, XStack } from "tamagui";

type TagProps = {
  backgroundColor: string;
  children: ReactNode;
};

export const Tag = ({ backgroundColor, children }: TagProps) => {
  return (
    <View
      backgroundColor={backgroundColor}
      paddingVertical={"$1"}
      paddingHorizontal={"$2"}
      borderRadius={"$1"}
    >
      <XStack justifyContent="space-between" alignItems="center" gap={"$2"}>
        {children}
      </XStack>
    </View>
  );
};
