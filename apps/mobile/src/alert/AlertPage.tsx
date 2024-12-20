import { Button, Text, XStack, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import { useGetUserMe } from "../schema/default/default";
import { AlertList } from "./AlertList";

export const AlertPage = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();
  const { data: user } = useGetUserMe();

  const { t } = useTranslation();

  return (
    <Layout
      gap={"$10"}
      justifyContent="space-between"
      hideBackButton
      marginVertical={"$4"}
    >
      <YStack gap={"$5"}>
        <YStack gap={"$3"}>
          <YStack>
            <Text fontSize={"$3"} fontWeight={"$6"}>
              {t("Alerts")}
            </Text>
            <Text fontSize={"$1"} fontWeight={"$4"} color={"$gray10"}>
              {t("Your active alerts")}
            </Text>
          </YStack>
          <AlertList active />
        </YStack>
        <YStack gap={"$3"}>
          <YStack>
            <Text fontSize={"$3"} fontWeight={"$6"}>
              {t("Reached")}
            </Text>
            <Text fontSize={"$1"} fontWeight={"$4"} color={"$gray10"}>
              {t("Your reached alerts")}
            </Text>
          </YStack>
          <AlertList active={false} />
        </YStack>
      </YStack>
      <Button bg={"$primary"} color={"$white1"}>
        {t("Create alert")}
      </Button>
    </Layout>
  );
};
