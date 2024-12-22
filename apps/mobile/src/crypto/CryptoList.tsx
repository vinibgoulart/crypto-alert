import {
  ListItem,
  ScrollView,
  Separator,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import { useTranslation } from "react-i18next";
import { useGetCryptosInfinite } from "../schema/default/default";
import { ChevronRight } from "@tamagui/lucide-icons";
import moment from "moment";

export const CryptoList = () => {
  const { t } = useTranslation();
  const {
    data: cryptoResponse,
    isLoading,
    fetchNextPage,
  } = useGetCryptosInfinite(undefined, {
    query: {
      initialPageParam: "1",
      getNextPageParam: (lastPage) => lastPage.data.nextPage,
    },
  });

  const cryptoData = cryptoResponse?.pages.map((page) => page.data.data).flat();

  const contentGet = () => {
    if (isLoading || !Array.isArray(cryptoData)) {
      return (
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            iconAfter={<ChevronRight color={"$gray11"} />}
            backgroundColor={"$secondaryDark"}
          />
        </YGroup.Item>
      );
    }

    return cryptoData.map((crypto, i) => {
      return (
        <YGroup.Item key={`${crypto.symbol}-${i}`}>
          <ListItem
            hoverTheme
            pressTheme
            iconAfter={<ChevronRight color={"$gray11"} />}
            backgroundColor={"$secondaryDark"}
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
        </YGroup.Item>
      );
    });
  };

  return (
    <ScrollView borderWidth={1} onTouchEnd={() => fetchNextPage()}>
      <YStack gap={"$5"}>
        <YGroup alignSelf="center" bordered size="$5" separator={<Separator />}>
          {contentGet()}
        </YGroup>
      </YStack>
    </ScrollView>
  );
};
