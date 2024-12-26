import { ALERT_STATUS_ENUM } from "@crypto-alert/enum";
import { Tag } from "../Tag";
import { Text } from "tamagui";

type AlertStatysTagProps = {
  status?: ALERT_STATUS_ENUM;
};

const alertStatusTexts = {
  [ALERT_STATUS_ENUM.ACTIVE]: "Active",
  [ALERT_STATUS_ENUM.REACHED]: "Reached",
  [ALERT_STATUS_ENUM.REMOVED]: "Removed",
};

const alertStatusBackgroundColors = {
  [ALERT_STATUS_ENUM.ACTIVE]: "$blue12",
  [ALERT_STATUS_ENUM.REACHED]: "$green12",
  [ALERT_STATUS_ENUM.REMOVED]: "$red12",
};

const alertStatusTextColors = {
  [ALERT_STATUS_ENUM.ACTIVE]: "$blue10",
  [ALERT_STATUS_ENUM.REACHED]: "$green10",
  [ALERT_STATUS_ENUM.REMOVED]: "$red10",
};

export const AlertStatusTag = ({ status }: AlertStatysTagProps) => {
  if (!status) {
    return null;
  }

  return (
    <Tag backgroundColor={alertStatusBackgroundColors[status]}>
      <Text color={alertStatusTextColors[status]}>
        {alertStatusTexts[status]}
      </Text>
    </Tag>
  );
};
