import {
  ChevronRight,
  Coins,
  TrendingDown,
  TrendingUp,
} from "@tamagui/lucide-icons";
import { ListItem, Text, View, XStack, YStack } from "tamagui";
import { useTranslation } from "react-i18next";
import { Alert } from "../../schema/model";
import { Tag } from "../Tag";

type AlertCardProps = {
  alert: Alert;
  onPress?: (item: Alert) => void;
};

export const AlertCard = ({ alert, onPress }: AlertCardProps) => {
  const shouldDecreasePrice = alert.differencePrice.includes("-");
  const { t } = useTranslation();

  return (
    <ListItem
      hoverTheme
      pressTheme
      icon={Coins}
      iconAfter={ChevronRight}
      backgroundColor={"$secondaryDark"}
      onPress={() => onPress?.(alert)}
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
          <Tag backgroundColor={shouldDecreasePrice ? "$red12" : "$green12"}>
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
          </Tag>
        </XStack>
      </YStack>
    </ListItem>
  );
};
