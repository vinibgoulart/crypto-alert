import { ListItem, Separator, Text } from "tamagui";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "@tamagui/lucide-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ALERT_STATUS_ENUM } from "@crypto-alert/enum";
import { useGetAlertsInfinite } from "../../schema/default/default";
import { INavigationPages } from "../../navigation/NavigationPages";
import { FlatList } from "react-native";
import { AlertReachedCard } from "./AlertReachedCard";
import { Alert } from "../../schema/model";

export const AlertReachedList = () => {
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();

  const { data: alertResponse, fetchNextPage } = useGetAlertsInfinite(
    {
      status: ALERT_STATUS_ENUM.REACHED,
    },
    {
      query: {
        initialPageParam: "1",
        getNextPageParam: (lastPage) => lastPage.data.nextPage,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    }
  );

  const { t } = useTranslation();

  const alertData = alertResponse?.pages.map((page) => page.data.data).flat();

  if (!Array.isArray(alertData) || !alertData.length) {
    return (
      <ListItem
        hoverTheme
        pressTheme
        title={<Text color={"$gray11"}>{t("No reached alerts")}</Text>}
        subTitle={<Text fontSize={"$0.5"}>{t("Create alert")}</Text>}
        iconAfter={<ChevronRight color={"$gray11"} />}
        backgroundColor={"$secondaryDark"}
        onPress={() => navigate("AlertCreatePage")}
      />
    );
  }

  const onPress = (alert: Alert) => {
    navigate("AlertDetailsPage", {
      _id: alert._id,
    });
  };

  return (
    <FlatList
      data={alertData}
      renderItem={({ item }) => (
        <AlertReachedCard alert={item} onPress={onPress} />
      )}
      keyExtractor={(item, i) => `${item.symbol}-${i}`}
      onEndReached={() => fetchNextPage()}
      ItemSeparatorComponent={Separator}
      nestedScrollEnabled
      scrollEnabled={false}
    />
  );
};
