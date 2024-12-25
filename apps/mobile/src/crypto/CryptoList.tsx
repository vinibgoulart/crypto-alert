import { Separator } from "tamagui";
import { useGetCryptosInfinite } from "../schema/default/default";
import { CryptoCard, CryptoCardSkeleton } from "./CryptoCard";
import { Crypto } from "../schema/model";
import { FlatList } from "react-native";

type CryptoListProps = {
  onPress: (item: Crypto) => void;
};

export const CryptoList = ({ onPress }: CryptoListProps) => {
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

  if (isLoading || !Array.isArray(cryptoData)) {
    Array.from({ length: 20 }, (_, i) => <CryptoCardSkeleton key={i} />);
  }

  return (
    <FlatList
      data={cryptoData}
      renderItem={({ item }) => <CryptoCard crypto={item} onPress={onPress} />}
      keyExtractor={(item, i) => `${item.symbol}-${i}`}
      onEndReached={() => fetchNextPage()}
      ItemSeparatorComponent={Separator}
    />
  );
};
