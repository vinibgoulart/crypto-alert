import { Text, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { CryptoList } from "../crypto/CryptoList";
import { useTranslation } from "react-i18next";

export const AlertCreatePage = () => {
  const { t } = useTranslation();
  return (
    <Layout gap={"$10"} justifyContent="space-between">
      <YStack gap={"$5"} flex={1}>
        <YStack gap={"$3"} flex={1}>
          <YStack>
            <Text fontSize={"$3"} fontWeight={"$6"}>
              {t("Crypto")}
            </Text>
            <Text fontSize={"$1"} fontWeight={"$4"} color={"$gray10"}>
              {t("Select the crypto to receive the alert")}
            </Text>
          </YStack>
          <CryptoList />
        </YStack>
      </YStack>
    </Layout>
  );
};
