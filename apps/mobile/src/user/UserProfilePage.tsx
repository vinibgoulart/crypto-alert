import { Button, Text, XStack, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import {
  postAuthLogout,
  useGetUserMe,
  usePostAuthLogout,
} from "../schema/default/default";

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
      <YStack>
        <Text>
          {t("You are logged in as")}: {user?.data.email}
        </Text>
      </YStack>
      <Button bg={"$primary"} color={"$white1"} onPress={onLogout}>
        {t("Logout")}
      </Button>
    </Layout>
  );
};
