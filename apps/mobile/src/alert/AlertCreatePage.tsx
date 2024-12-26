import { Button, Sheet } from "tamagui";
import { Layout } from "../components/Layout";
import { CryptoList } from "../components/crypto/CryptoList";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input } from "../components/input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postAlertBody } from "../schema/default/default.zod";
import { z } from "zod";
import {
  getGetAlertsInfiniteQueryOptions,
  postAlert,
  postAlertResponse,
  usePostAlert,
} from "../schema/default/default";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { INavigationPages } from "../navigation/NavigationPages";
import { Crypto } from "../schema/model";
import { useUpdateInfiniteQueryWithMutation } from "../hooks/useUpdateInfiniteQueryWithMutation";
import { Section } from "../components/Section";

type Values = z.infer<typeof postAlertBody>;

export const AlertCreatePage = () => {
  const [open, setOpen] = useState(false);
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();
  const { t } = useTranslation();
  const { queryKey } = getGetAlertsInfiniteQueryOptions();
  const { updateInfiniteQueryWithMutation } =
    useUpdateInfiniteQueryWithMutation();

  const formConfig = useForm<Values>({
    defaultValues: {
      price: "",
      symbol: "",
    },
    resolver: zodResolver(postAlertBody),
    mode: "all",
  });

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    setValue,
  } = formConfig;

  const handleOpen = (crypto: Crypto) => {
    setOpen(true);
    setValue("symbol", crypto.symbol);
    setValue("price", crypto.price.toString());
  };

  const postAuthRegisterMutation = usePostAlert({
    mutation: {
      mutationFn: ({ data }: { data: Values }) => postAlert(data),
      onSuccess(response) {
        if ("error" in response.data) {
          Toast.show({
            type: "error",
            text1: t("Error"),
            text2: response.data.error as string,
          });

          return;
        }

        updateInfiniteQueryWithMutation<postAlertResponse>(
          queryKey,
          response.data
        );
        navigate("HomePage");
      },
      onError(error) {
        Toast.show({
          type: "error",
          text1: t("Error"),
          text2: error.error,
        });
      },
    },
  });

  const onSubmit = (data: Values) => {
    postAuthRegisterMutation.mutate({ data });
  };

  return (
    <Layout gap={"$10"} justifyContent="space-between">
      <Section
        title={t("Crypto")}
        subtitle={t("Select the crypto to receive the alert")}
      >
        <CryptoList onPress={handleOpen} />
      </Section>
      <Sheet
        modal={true}
        snapPoints={[180, 190]}
        snapPointsMode="constant"
        onOpenChange={setOpen}
        open={open}
        animation="medium"
        zIndex={100_000}
        forceRemoveScrollEnabled={open}
        dismissOnSnapToBottom
        dismissOnOverlayPress
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame
          backgroundColor="$secondaryDark"
          justifyContent="center"
          gap={"$3"}
          paddingHorizontal={"$5"}
        >
          <FormProvider {...formConfig}>
            <Input
              label={t("Price")}
              placeholder="190.0000000"
              name="price"
              keyboardType="decimal-pad"
            />
            <Button
              bg={"$primary"}
              color={"$white1"}
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit(onSubmit)}
            >
              {t("Create alert")}
            </Button>
          </FormProvider>
        </Sheet.Frame>
      </Sheet>
    </Layout>
  );
};
