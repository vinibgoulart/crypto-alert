import {
  ChevronRight,
  Coins,
  TrendingDown,
  TrendingUp,
} from "@tamagui/lucide-icons";
import { ListItem, Text, View, XStack, YStack } from "tamagui";
import { Alert } from "../schema/model";
import { useTranslation } from "react-i18next";

type AlertCardProps = {
  alert: Alert;
};

export const AlertCard = ({ alert }: AlertCardProps) => {
  const shouldDecreasePrice = alert.differencePrice.includes("-");
  const { t } = useTranslation();

  return (
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
  );
};
