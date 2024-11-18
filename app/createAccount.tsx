import { Image, Text, View } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";

export default function CreateAccount() {
  return (
    <View className="flex-1 items-center gap-4 bg-white">
      <Image
        className="py-4 mt-12"
        source={require("@/assets/images/loginImage.png")}
      />
      <Text className="font-bold text-2xl mb-10">Cadastre-se</Text>
      <View className="flex flex-row w-[80%]">
        <Input
          placeholder="Luana"
          classname="py-1 px-3 rounded-lg w-[60%]"
        />
        <Input
          placeholder="Do Rei"
          classname="py-1 px-3 rounded-lg"
        />
      </View>
      <Input
        placeholder="luanadorei@email.com"
        classname="w-[80%] py-1 px-3 rounded-lg"
      />
      <Input
        placeholder="---------"
        classname="w-[80%] py-1 px-3 rounded-lg"
      />
      <Button textButton="Cadastrar-se" classname="w-[80%] bg-blue" textStyle="text-white" />
    </View>
  );
}
