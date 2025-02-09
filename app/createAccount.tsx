import { Image, Text, View } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";
import { Link, router, useRouter } from "expo-router";
import { useState } from "react";
import { signUp } from './services/firebaseService';

export default function CreateAccount() {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  async function createUser() {
    if (!email || !senha || !nome || !sobrenome || !username ) {
      console.log('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const { user, error } = await signUp({nome:nome, sobrenome:sobrenome, email:email, password:senha, username: username});

    if (error) {
      console.log('Erro', error);
      return;
    }

    console.log('Sucesso', 'Usuário cadastrado com sucesso!');
    router.push('/(tabs)/initialScreen');
  }

  return (
    <View className="flex-1 items-center gap-2 bg-white">
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
            classname="py-1 px-3 rounded-lg w-full border"
            onChangeText={setNome}
          />
        </View>
        <View className="w-[55%]">
          <Text className="text-sm font-semibold mb-1">Sobrenome</Text>
          <Input
            placeholder="Do Rei"
            classname="py-1 px-3 rounded-lg w-full border"
            onChangeText={setSobrenome}          
          />
        </View>
      </View>
      <View className="w-[80%]">
          <Text className="text-sm font-semibold mb-1">Nome de usuário</Text>
          <Input
            placeholder="Nome que será exibido no seu perfil"
            classname="py-1 px-3 rounded-lg w-full border"
            onChangeText={setUsername}
          />
        </View> 
      <View className="w-[80%]">
        <Text className="text-sm font-semibold mb-1">Email</Text>
        <Input
          placeholder="luanadorei@email.com"
          classname=" py-1 px-3 rounded-lg border"
          onChangeText={setEmail}
        />
      </View>
      <View className="w-[80%]">
        <Text className="text-sm font-semibold mb-1">Senha</Text>
        <Input
          placeholder="---------"
          classname="py-1 px-3 rounded-lg border"
          password={true}
          onChangeText={setSenha}
        />
      </View>
      <Button onPress={createUser} textButton="Cadastrar-se" classname="w-[80%] bg-blue" textStyle="text-white" />
      <Text className="font-extralight text-xs text-center">Ao cadastrar-se, você concorda com nossos <Link href="/homeScreen">termos de serviços.</Link></Text>
    </View>
  );
}
