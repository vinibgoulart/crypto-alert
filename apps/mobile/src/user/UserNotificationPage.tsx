import { ScrollView, Text, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";

export const UserNotificationPage = () => {
  const { t } = useTranslation();
  return (
    <Layout gap={"$10"} justifyContent="space-between">
      <ScrollView>
        <YStack gap={"$5"}>
          <Section
            title={t("Notifications")}
            subtitle={t("Notifications settings")}
          />
        </YStack>
      </ScrollView>
    </Layout>
  );
};
