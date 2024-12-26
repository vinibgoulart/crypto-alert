import { Separator, YStack } from "tamagui";
import { useGetCryptosInfinite } from "../../schema/default/default";
import { CryptoCard, CryptoCardSkeleton } from "./CryptoCard";
import { Crypto } from "../../schema/model";
import { FlatList } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputSearch } from "../input/InputSearch";

type CryptoListProps = {
  onPress: (item: Crypto) => void;
};

export const CryptoList = ({ onPress }: CryptoListProps) => {
  const { t } = useTranslation();

  const formConfig = useForm({
    defaultValues: {
      search: "",
    },
    mode: "all",
  });

  const { getValues } = formConfig;

  const search = getValues("search");

  const {
    data: cryptoResponse,
    isLoading,
    fetchNextPage,
  } = useGetCryptosInfinite(
    {
      search,
    },
    {
      query: {
        initialPageParam: "1",
        getNextPageParam: (lastPage) => lastPage.data.nextPage,
      },
    }
  );

  const cryptoData = cryptoResponse?.pages.map((page) => page.data.data).flat();

  if (isLoading || !Array.isArray(cryptoData)) {
    return Array.from({ length: 20 }, (_, i) => <CryptoCardSkeleton key={i} />);
  }

  return (
    <YStack gap={"$3"} flex={1}>
      <FormProvider {...formConfig}>
        <InputSearch
          label={t("Search")}
          name="search"
          placeholder={t("Search")}
        />
      </FormProvider>
      <FlatList
        data={cryptoData}
        renderItem={({ item }) => (
          <CryptoCard crypto={item} onPress={onPress} />
        )}
        keyExtractor={(item, i) => `${item.symbol}-${i}`}
        onEndReached={() => fetchNextPage()}
        ItemSeparatorComponent={Separator}
      />
    </YStack>
  );
};
