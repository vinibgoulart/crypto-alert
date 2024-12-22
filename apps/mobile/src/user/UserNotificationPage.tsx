import { ScrollView, Text, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";

export const UserNotificationPage = () => {
  const { t } = useTranslation();
  return (
    <Layout gap={"$10"} justifyContent="space-between">
      <ScrollView>
        <YStack gap={"$5"}>
          <YStack gap={"$3"}>
            <YStack>
              <Text fontSize={"$3"} fontWeight={"$6"}>
                {t("Notifications")}
              </Text>
              <Text fontSize={"$1"} fontWeight={"$4"} color={"$gray10"}>
                {t("Notifications settings")}
              </Text>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </Layout>
  );
};
