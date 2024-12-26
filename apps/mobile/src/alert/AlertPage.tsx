import { Button, Text, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import { AlertList } from "../components/alert/AlertList";
import { AlertReachedList } from "../components/alert/AlertReachedList";
import { Section } from "../components/Section";
export const AlertPage = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();
  const { t } = useTranslation();

  return (
    <Layout gap={"$10"} justifyContent="space-between" hideBackButton>
      <YStack gap={"$5"}>
        <Section title={t("Alerts")} subtitle={t("Your active alerts")}>
          <AlertList />
        </Section>
        <Section title={t("Reached")} subtitle={t("Your reached alerts")}>
          <AlertReachedList />
        </Section>
      </YStack>
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
