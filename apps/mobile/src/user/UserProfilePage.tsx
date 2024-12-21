import {
  Button,
  ListItem,
  Separator,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import {
  postAuthLogout,
  useGetUserMe,
  usePostAuthLogout,
} from "../schema/default/default";
import { ChevronRight, CircleUserRound } from "@tamagui/lucide-icons";

export const UserProfilePage = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();
  const { data: user } = useGetUserMe();

  const { t } = useTranslation();

  const postAuthLogoutMutation = usePostAuthLogout({
    mutation: {
      mutationFn: () => postAuthLogout(),
      onSuccess() {
        navigate("AuthWelcomePage");
      },
    },
  });

  const onLogout = async () => {
    postAuthLogoutMutation.mutate();
  };

  return (
    <Layout
      gap={"$10"}
      justifyContent="space-between"
      hideBackButton
      marginVertical={"$4"}
    >
      <YStack gap={"$3"}>
        <XStack gap={"$3"}>
          <CircleUserRound size={"$5"} />
          <YStack>
            <Text fontSize={"$3"} fontWeight={"$6"}>
              {user?.data.name}
            </Text>
            <Text fontSize={"$1"} fontWeight={"$4"} color={"$gray10"}>
              {user?.data.email}
            </Text>
          </YStack>
        </XStack>
        <YGroup alignSelf="center" bordered size="$5" separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title={t("Notifications")}
              iconAfter={ChevronRight}
              backgroundColor={"$secondaryDark"}
            />
          </YGroup.Item>
        </YGroup>
      </YStack>
      <Button bg={"$red10"} color={"$white1"} onPress={onLogout}>
        {t("Logout")}
      </Button>
    </Layout>
  );
};
