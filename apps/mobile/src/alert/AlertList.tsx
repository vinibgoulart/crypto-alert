import {
  ListItem,
  Separator,
  Text,
  View,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import { useGetAlerts } from "../schema/default/default";
import { useTranslation } from "react-i18next";
import {
  ChevronRight,
  Coins,
  TrendingDown,
  TrendingUp,
} from "@tamagui/lucide-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";

export const AlertList = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();
  const { data: alerts } = useGetAlerts();

  const { t } = useTranslation();

  const contentGet = () => {
    if (!alerts?.data?.length) {
      return (
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title={<Text color={"$gray11"}>{t("No active alerts")}</Text>}
            subTitle={<Text fontSize={"$0.5"}>{t("Create alert")}</Text>}
            iconAfter={<ChevronRight color={"$gray11"} />}
            backgroundColor={"$secondaryDark"}
            onPress={() => navigate("AlertCreatePage")}
          />
        </YGroup.Item>
      );
    }

    return alerts.data.map((alert, i) => {
      const shouldDecreasePrice = alert.differencePrice.includes("-");

      return (
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
              <XStack alignItems="center" justifyContent="space-between">
                <Text fontSize={"$0.5"}>{alert.currentPrice}</Text>
                <View
                  backgroundColor={shouldDecreasePrice ? "$red12" : "$green12"}
                  paddingVertical={"$1"}
                  paddingHorizontal={"$2"}
                  borderRadius={"$1"}
                >
                  <XStack
                    justifyContent="space-between"
                    alignItems="center"
                    gap={"$2"}
                  >
                    {shouldDecreasePrice ? (
                      <TrendingDown color={"$red10"} size={"$1"} />
                    ) : (
                      <TrendingUp color={"$green10"} size={"$1"} />
                    )}
                    <Text
                      fontSize={"$0.5"}
                      fontWeight={"$6"}
                      color={shouldDecreasePrice ? "$red10" : "$green10"}
                    >
                      {alert.differencePrice}
                    </Text>
                  </XStack>
                </View>
              </XStack>
            </YStack>
          </ListItem>
        </YGroup.Item>
      );
    });
  };

  return (
    <YGroup alignSelf="center" bordered size="$5" separator={<Separator />}>
      {contentGet()}
    </YGroup>
  );
};
