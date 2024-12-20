import { Button, Text, XStack, YStack } from "tamagui";
import { useGetAlert } from "../schema/default/default";
import { useTranslation } from "react-i18next";
import { SquarePlus } from "@tamagui/lucide-icons";

type AlertListProps = {
  active?: boolean;
};

export const AlertList = ({ active }: AlertListProps) => {
  const { data: alerts } = useGetAlert({
    active,
  });

  const { t } = useTranslation();

  if (!alerts?.data.length) {
    const label = active ? t("No active alerts") : t("No reached alerts");

    return (
      <Button
        w={"$full"}
        backgroundColor={"$secondaryDark"}
        borderColor={"$gray6"}
        h={"$6"}
      >
        <YStack>
          <Text textAlign="center" color={"$gray12"} fontWeight={"$5"}>
            {label}
          </Text>
          <XStack justifyContent="center" alignItems="center" gap="$1">
            <Text textAlign="center" fontSize={"$0.5"} color={"$gray11"}>
              {t("Create alert")}
            </Text>
            <SquarePlus color={"$gray11"} size={"$1"} />
          </XStack>
        </YStack>
      </Button>
    );
  }

  return (
    <XStack>
      <Text>tachau</Text>
    </XStack>
  );
};
