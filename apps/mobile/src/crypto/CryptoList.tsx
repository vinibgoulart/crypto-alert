import { ScrollView, Separator, YGroup } from "tamagui";
import { useGetCryptosInfinite } from "../schema/default/default";
import { CryptoCard, CryptoCardSkeleton } from "./CryptoCard";

export const CryptoList = () => {
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
      return Array.from({ length: 20 }, (_, i) => (
        <CryptoCardSkeleton key={i} />
      ));
    }

    return cryptoData.map((crypto, i) => (
      <CryptoCard key={`${crypto.symbol}-${i}`} crypto={crypto} />
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
