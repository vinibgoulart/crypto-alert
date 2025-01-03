import { useTranslation } from "react-i18next";
import { Alert } from "../../schema/model";
import { ListItem, Text, XStack, YStack } from "tamagui";
import { ChevronRight, Coins } from "@tamagui/lucide-icons";
import moment from "moment";

type AlertReachedCardProps = {
  alert: Alert;
  onPress?: (item: Alert) => void;
};

export const AlertReachedCard = ({ alert, onPress }: AlertReachedCardProps) => {
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
              {alert.price} USD
            </Text>
          </XStack>
        </XStack>
        <Text fontSize={"$0.5"}>
          {moment(alert.reachedAt).format("YYYY-MM-DD HH:mm:ss")}
        </Text>
      </YStack>
    </ListItem>
  );
};
