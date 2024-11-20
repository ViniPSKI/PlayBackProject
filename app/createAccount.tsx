import { Image, Text, View } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";
import { Link, router } from "expo-router";

export default function CreateAccount() {
  return (
    <View className="flex-1 items-center gap-4 bg-white">
      <Image
        className="py-4 mt-5"
        source={require("@/assets/images/loginImage.png")}
      />
      <Text className="font-bold text-2xl mb-5">Cadastre-se</Text>
      <View className="w-[80%] flex flex-row items-center gap-4">
        <View className="w-[40%]">
          <Text className="text-sm font-semibold mb-1">Nome</Text>
          <Input
            placeholder="Luana"
            classname="py-1 px-3 rounded-lg w-full h-10 border"
          />
        </View>
        <View className="w-[55%]">
          <Text className="text-sm font-semibold mb-1">Sobrenome</Text>
          <Input
            placeholder="Do Rei"
            classname="py-1 px-3 rounded-lg w-full h-10 border"
          />
        </View>
      </View>
      <View className="w-[80%]">
        <Text className="text-sm font-semibold mb-1">Email</Text>
        <Input
          placeholder="luanadorei@email.com"
          classname=" py-1 px-3 rounded-lg border"
        />
      </View>
      <View className="w-[80%]">
        <Text className="text-sm font-semibold mb-1">Senha</Text>
        <Input
          placeholder="---------"
          classname="py-1 px-3 rounded-lg border"
          password={true}
        />
      </View>
      <Button onPress={() => router.push("/(tabs)/initialScreen")} textButton="Cadastrar-se" classname="w-[80%] bg-blue" textStyle="text-white" />
      <Text className="font-extralight text-xs text-center">Ao cadastrar-se, você concorda com nossos <Link href="/homeScreen">termos de serviços.</Link></Text>
    </View>
  );
}
