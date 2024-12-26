import { Label, RadioGroup, ScrollView, YStack } from "tamagui";
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
        <RadioGroup
          value="notification"
          gap="$2"
          flexDirection="row"
          alignItems="center"
        >
          <RadioGroup.Item value="notification" id="notification">
            <RadioGroup.Indicator />
          </RadioGroup.Item>
          <Label htmlFor={"notification"}>Push notification</Label>
        </RadioGroup>
      </ScrollView>
    </Layout>
  );
};
