import { ALERT_TARGET_ENUM } from "@crypto-alert/enum";
import { useTranslation } from "react-i18next";
import { Text } from "tamagui";

type AlertStatysTagProps = {
  target?: ALERT_TARGET_ENUM;
};

const alertTargetTexts = {
  [ALERT_TARGET_ENUM.HIGHER]: "Higher",
  [ALERT_TARGET_ENUM.LOWER]: "Lower",
};

export const AlertTargetText = ({ target }: AlertStatysTagProps) => {
  const { t } = useTranslation();

  if (!target) {
    return null;
  }

  return <Text>{t(alertTargetTexts[target])}</Text>;
};
