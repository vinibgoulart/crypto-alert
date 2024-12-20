import { Button, Text, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { AlertList } from "./AlertList";
import { AlertReachedList } from "./AlertReachedList";

export const AlertCreatePage = () => {
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
          <AlertList />
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
          <AlertReachedList />
        </YStack>
      </YStack>
      <Button bg={"$primary"} color={"$white1"}>
        {t("Create alert")}
      </Button>
    </Layout>
  );
};
