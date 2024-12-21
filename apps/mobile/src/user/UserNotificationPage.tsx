import { Button, ScrollView, Text, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import {
  postAuthLogout,
  useGetUserMe,
  usePostAuthLogout,
} from "../schema/default/default";

export const UserNotificationPage = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();
  const { data: user } = useGetUserMe();

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
