import {
  ListItem,
  ScrollView,
  Separator,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import { useGetAlertsInfinite } from "../schema/default/default";
import { useTranslation } from "react-i18next";
import { ChevronRight, Coins } from "@tamagui/lucide-icons";
import moment from "moment";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";

export const AlertReachedList = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();

  const {
    data: alertResponse,
    isLoading,
    fetchNextPage,
  } = useGetAlertsInfinite(
    {
      active: "false",
    },
    {
      query: {
        initialPageParam: "1",
        getNextPageParam: (lastPage) => lastPage.data.nextPage,
      },
    }
  );

  const { t } = useTranslation();

  const alertData = alertResponse?.pages.map((page) => page.data.data).flat();

  const contentGet = () => {
    if (!isLoading || !Array.isArray(alertData)) {
      return (
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title={<Text color={"$gray11"}>{t("No reached alerts")}</Text>}
            subTitle={<Text fontSize={"$0.5"}>{t("Create alert")}</Text>}
            iconAfter={<ChevronRight color={"$gray11"} />}
            backgroundColor={"$secondaryDark"}
            onPress={() => navigate("AlertCreatePage")}
          />
        </YGroup.Item>
      );
    }

    return alertData.map((alert, i) => (
      <YGroup.Item key={`${alert.symbol}-${i}`}>
        <ListItem
          hoverTheme
          pressTheme
          icon={Coins}
          iconAfter={ChevronRight}
          backgroundColor={"$secondaryDark"}
        >
          <YStack width={"$19"} gap={"$2"}>
            <XStack alignItems="center" justifyContent="space-between">
              <Text color={"$primary"} fontWeight={"$6"} fontSize={"$2"}>
                {alert.symbol}
              </Text>
              <XStack>
                <Text>{t("Price")}: </Text>
                <Text color={"$primary"} fontWeight={"$6"}>
                  {alert.price}
                </Text>
              </XStack>
            </XStack>
            <Text fontSize={"$0.5"}>
              {moment(alert.reachedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
          </YStack>
        </ListItem>
      </YGroup.Item>
    ));
  };

  return (
    <ScrollView onTouchEnd={() => fetchNextPage()}>
      <YGroup alignSelf="center" bordered size="$5" separator={<Separator />}>
        {contentGet()}
      </YGroup>
    </ScrollView>
  );
};
