import { useFormContext } from "react-hook-form";
import { Input as _Input } from "tamagui";
import { Input, InputProps } from "./Input";
import { useCallback, useState } from "react";
import lodash from "lodash";

export const InputSearch = (props: InputProps) => {
  const [search, setSearch] = useState("");
  const { setValue } = useFormContext();

  const debouncedSetPesquisa = useCallback(
    lodash.debounce((v) => {
      setValue(props.name, v);
    }, 1000),
    []
  );

  const onChange = (value: string) => {
    setSearch(value);
    debouncedSetPesquisa.cancel();
    debouncedSetPesquisa(value);
  };

  return <Input {...props} onChangeText={onChange} value={search} />;
};
