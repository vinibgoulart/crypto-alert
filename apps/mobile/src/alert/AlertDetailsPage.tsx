import { Layout } from "../components/Layout";
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { useGetAlert } from "../schema/default/default";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { INavigationPages } from "../navigation/NavigationPages";
import { Text, View } from "tamagui";
import { AlertStatusTag } from "../components/alert/AlertStatusTag";
import { ALERT_STATUS_ENUM } from "@crypto-alert/enum";
import moment from "moment";
import { Card } from "../components/Card";

type AlertDetailsPageProps = NativeStackScreenProps<
  INavigationPages,
  "AlertDetailsPage"
>;

export const AlertDetailsPage = ({ route }: AlertDetailsPageProps) => {
  const { _id } = route.params;
  const { t } = useTranslation();
  const { data: alert } = useGetAlert({
    _id,
  });

  return (
    <Layout gap={"$10"} justifyContent="space-between">
      <Section
        title={`${t("Alert")} - ${alert?.data.symbol}`}
        subtitle={`${t("Price")}: ${alert?.data.price}`}
        right={
          <View>
            <AlertStatusTag status={alert?.data.status as ALERT_STATUS_ENUM} />
          </View>
        }
      >
        <Card title={t("Current price")}>
          <Text>{alert?.data.currentPrice}</Text>
        </Card>
        <Card title={t("Difference price")}>
          <Text>{alert?.data.differencePrice}</Text>
        </Card>
        <Card title={t("Created at")}>
          <Text>
            {moment(alert?.data.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </Text>
        </Card>
        <Card title={t("Reached at")}>
          <Text>
            {alert?.data.reachedAt
              ? moment(alert?.data.reachedAt)?.format("YYYY-MM-DD HH:mm:ss")
              : t("Not reached")}
          </Text>
        </Card>
      </Section>
    </Layout>
  );
};
