import { Button, ScrollView, Text, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import { AlertList } from "../components/alert/AlertList";
import { AlertReachedList } from "../components/alert/AlertReachedList";

export const AlertPage = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();
  const { t } = useTranslation();

  return (
    <Layout gap={"$10"} justifyContent="space-between" hideBackButton>
      <ScrollView>
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
      </ScrollView>
      <Button
        bg={"$primary"}
        color={"$white1"}
        onPress={() => navigate("AlertCreatePage")}
      >
        {t("Create alert")}
      </Button>
    </Layout>
  );
};
