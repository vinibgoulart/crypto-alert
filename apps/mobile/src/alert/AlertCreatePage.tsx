import { Button, Sheet, Text, YStack } from "tamagui";
import { Layout } from "../components/Layout";
import { CryptoList } from "../crypto/CryptoList";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const AlertCreatePage = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const handleOpen = () => {
    setOpen(true);
  };

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
          <CryptoList onPress={handleOpen} />
        </YStack>
      </YStack>
      <Sheet
        modal={true}
        snapPoints={[256, 190]}
        snapPointsMode="constant"
        onOpenChange={setOpen}
        open={open}
        animation="medium"
        zIndex={100_000}
        forceRemoveScrollEnabled={open}
        dismissOnSnapToBottom
        dismissOnOverlayPress
      >
        <Sheet.Handle />
        <Sheet.Frame
          backgroundColor="$secondaryDark"
          justifyContent="center"
          alignItems="center"
        ></Sheet.Frame>
      </Sheet>
    </Layout>
  );
};
