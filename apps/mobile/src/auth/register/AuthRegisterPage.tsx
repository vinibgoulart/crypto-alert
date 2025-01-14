import { Button, Text, YStack } from "tamagui";
import { AuthLayout } from "../../components/AuthLayout";
import { useTranslation } from "react-i18next";
import { Input } from "../../components/input/Input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  postAuthRegister,
  usePostAuthRegister,
} from "../../schema/default/default";
import { INavigationPages } from "../../navigation/NavigationPages";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { InputPhone } from "../../components/input/InputPhone";
import phone from "phone";

export const AuthRegisterPage = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProp<INavigationPages>>();

  const schemaValidation = z
    .object({
      name: z
        .string({
          message: t("Name is required"),
        })
        .min(2, { message: t("Name is too short") }),
      email: z
        .string({
          message: t("Email is required"),
        })
        .email({ message: t("Invalid email") }),
      phone: z
        .string({
          message: t("Phone is required"),
        })
        .min(10, { message: t("Phone is too short") }),
      password: z
        .string({
          message: t("Password is required"),
        })
        .min(6, {
          message: t("Password must be at least 6 characters"),
        })
        .regex(/[A-Z]/, { message: t("Password must contain an uppercase") })
        .regex(/[a-z]/, { message: t("Password must contain a lowercase") })
        .regex(/[0-9]/, { message: t("Password must contain a number") }),
      passwordConfirm: z.string({
        message: t("Password confirmation is required"),
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: t("Passwords do not match"),
      path: ["passwordConfirm"],
    })
    .refine((data) => phone(data.phone).isValid, {
      message: t("Invalid phone"),
      path: ["phone"],
    });

  type Values = z.infer<typeof schemaValidation>;

  const formConfig = useForm<Values>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(schemaValidation),
    mode: "all",
  });

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = formConfig;

  const postAuthRegisterMutation = usePostAuthRegister({
    mutation: {
      mutationFn: ({ data }: { data: Omit<Values, "passwordConfirm"> }) =>
        postAuthRegister(data, {
          credentials: "include",
        }),
      onSuccess(response) {
        if ("error" in response.data) {
          Toast.show({
            type: "error",
            text1: t("Error"),
            text2: response.data.error as string,
          });

          return;
        }

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

  const onSubmit = async (data: Values) => {
    const { passwordConfirm, ...rest } = data;

    postAuthRegisterMutation.mutate({ data: rest });
  };

  return (
    <AuthLayout gap={"$5"} justifyContent="space-evenly">
      <FormProvider {...formConfig}>
        <YStack f={1} gap={"$5"}>
          <Text ta={"center"} fontSize={"$4"} fontWeight={"$6"}>
            {t("Do not waste your time anymore")}!
          </Text>
          <YStack gap={"$3"}>
            <Input label={t("Name")} placeholder="John Doe" name="name" />
            <InputPhone label={t("Phone")} name="phone" />
            <Input
              label={t("Email")}
              placeholder="email@email.com"
              name="email"
            />
            <Input
              label={t("Password")}
              placeholder="********"
              secureTextEntry
              name="password"
            />
            <Input
              label={t("Confirm your password")}
              placeholder="********"
              secureTextEntry
              name="passwordConfirm"
            />
          </YStack>
        </YStack>
        <Button
          bg={"$primary"}
          color={"$white1"}
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          {t("Continue")}
        </Button>
      </FormProvider>
    </AuthLayout>
  );
};
