import { Image, XStack, YStack, YStackProps } from "tamagui";

type ILayout = {
  children: React.ReactNode;
  hideBackButton?: boolean;
} & YStackProps;

import logoImg from "../../assets/logo.png";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import { ArrowLeft } from "@tamagui/lucide-icons";
import { useGetUserMe } from "../schema/default/default";
import { useCallback } from "react";

export const Layout = ({ children, hideBackButton, ...props }: ILayout) => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<INavigationPages>>();

  const { data } = useGetUserMe();

  useFocusEffect(
    useCallback(() => {
      if (data?.status !== 200) {
        navigate("AuthWelcomePage");
      }
    }, [data])
  );

  return (
    <YStack bg={"$secondary"} f={1} gap={"$5"} py={"$2"}>
      <XStack
        jc={"center"}
        ai={"center"}
        gap={"$2"}
        justifyContent="space-between"
        minHeight={"$3"}
      >
        {!hideBackButton && (
          <ArrowLeft color={"$primary"} size={"$3"} onPress={goBack} />
        )}
        <Image
          position="absolute"
          left={"50%"}
          transform={"translateX(-17px)"}
          source={{
            uri: logoImg,
            width: 35,
            height: 35,
          }}
        />
      </XStack>
      <YStack f={1} {...props}>
        {children}
      </YStack>
    </YStack>
  );
};
