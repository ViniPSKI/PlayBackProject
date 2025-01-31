import { useState } from "react";
import { TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface InputProps {
  placeholder?: string;
  password?: boolean;
  classname?: string;
  icon?: string;
  multiline?: boolean;
  styleTextInput?: string;
  value?: string;
  onChangeText?: (text: string) => void; // Adicionado para capturar mudanças no valor
}

function Input({
  icon,
  password,
  multiline,
  value,
  onChangeText,
  ...props
}: InputProps) {
  const defaultStyle = "border-gray rounded-xl flex flex-row items-center";
  const [secure, setSecure] = useState(password);

  return (
    <View className={`${defaultStyle} ${props.classname}`}>
      {icon && (
        <Icon name={icon} className="px-2" />
      )}
      <TextInput
        multiline={multiline}
        secureTextEntry={secure}
        placeholder={props.placeholder}
        value={value} // Vincula o valor ao estado externo
        onChangeText={onChangeText} // Passa a função de mudança de valor
        className={props.styleTextInput}
      />
      {password && (
        <Icon
          name={secure ? "eye" : "eye-off-outline"}
          size={20}
          color="gray"
          className="absolute right-3"
          onPress={() => setSecure(!secure)}
        />
      )}
    </View>
  );
}

export default Input;
