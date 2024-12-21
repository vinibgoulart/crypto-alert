import { secondaryDark } from "@crypto-alert/ui";
import { Controller, useFormContext } from "react-hook-form";
import ReactNativePhoneInput from "react-native-phone-input";
import { InputProps, Text, View, Input as _Input } from "tamagui";

type InputPhone = {
  label: string;
  name: string;
} & InputProps;

export const InputPhone = (props: InputPhone) => {
  const { label, name, ...rest } = props;

  const {
    formState: { errors },
    watch,
    control,
  } = useFormContext();

  if (!name) {
    return null;
  }

  watch(name);

  const error = errors[name]?.message as string;

  const borderColorGet = () => {
    if (error) {
      return {
        bc: "$red10",
        focusStyle: { bc: "$red10" },
      };
    }

    return {};
  };

  return (
    <View>
      {label && (
        <Text
          color={"$primary"}
          fontWeight={"$5"}
          pos={"absolute"}
          t={-12}
          left={10}
          zIndex={2}
        >
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <_Input asChild bg={"$secondaryDark"} {...borderColorGet()}>
            <ReactNativePhoneInput
              textStyle={{
                color: "#fff",
              }}
              initialCountry="br"
              onPressFlag={() => {}}
              value={value}
              onBlur={onBlur}
              onChangePhoneNumber={onChange}
              {...rest}
            />
          </_Input>
        )}
      />
      {error && (
        <Text color={"$red10"} fontSize={"$0.5"}>
          {error}
        </Text>
      )}
      <View
        pos={"absolute"}
        top={0}
        left={8}
        width={label.length * 10}
        height={1}
        bg={"$secondary"}
        zIndex={1}
      />
    </View>
  );
};
