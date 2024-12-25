import { ChevronRight } from "@tamagui/lucide-icons";
import moment from "moment";
import { ListItem, Text, View, XStack, YStack } from "tamagui";
import { Crypto } from "../schema/model";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../components/Skeleton";

type CryptoCardProps = {
  crypto: Crypto;
  onPress: (item: Crypto) => void;
};

export const CryptoCard = ({ crypto, onPress }: CryptoCardProps) => {
  const { t } = useTranslation();

  return (
    <View>
      <ListItem
        hoverTheme
        pressTheme
        iconAfter={<ChevronRight color={"$gray11"} />}
        backgroundColor={"$secondaryDark"}
        onPress={() => onPress(crypto)}
      >
        <YStack width={"100%"} gap={"$2"}>
          <XStack alignItems="center" justifyContent="space-between">
            <Text color={"$primary"} fontWeight={"$6"} fontSize={"$2"}>
              {crypto.symbol}
            </Text>
            <XStack>
              <Text>{t("Price")}: </Text>
              <Text color={"$primary"} fontWeight={"$6"}>
                {crypto.price}
              </Text>
            </XStack>
          </XStack>
          <Text fontSize={"$0.5"}>
            {moment(crypto.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        </YStack>
      </ListItem>
    </View>
  );
};

export const CryptoCardSkeleton = () => {
  const { t } = useTranslation();

  return (
    <View>
      <ListItem
        hoverTheme
        pressTheme
        iconAfter={<ChevronRight color={"$gray11"} />}
        backgroundColor={"$secondaryDark"}
      >
        <YStack width={"100%"} gap={"$2"}>
          <XStack alignItems="center" justifyContent="space-between">
            <Text color={"$primary"} fontWeight={"$6"} fontSize={"$2"}>
              <Skeleton />
            </Text>
            <XStack>
              <Text>{t("Price")}: </Text>
              <Text color={"$primary"} fontWeight={"$6"}>
                <Skeleton width={60} />
              </Text>
            </XStack>
          </XStack>
          <Text fontSize={"$0.5"}>
            <Skeleton height={10} />
          </Text>
        </YStack>
      </ListItem>
    </View>
  );
};
