import { View, Text, Image } from "react-native";
import Button from "./components/Button";
import Input from "./components/Input";
import { Link, router } from 'expo-router';

export default function LoginScreen(){
    return(
        <View className="flex-1 items-center gap-4 bg-white">
            <Image className="py-4 mt-12" source={require('@/assets/images/loginImage.png')} />
            <View className="flex items-center">
                <Text className="font-bold text-2xl">Seja bem vindo!</Text>
                <Text className="font-light">Digite suas credenciais para acessar</Text>
            </View>
            <Input placeholder="Email" classname="w-[90%] py-1 rounded-lg" icon="email-outline" />
            <Input placeholder="Senha" classname="w-[90%] py-1 rounded-lg" icon="lock" password={true} />
            <Button onPress={()=> router.push('/initialScreen')} textButton="Logar" classname="w-[60%] h-12 bg-blue" textStyle="text-white" />
            <View className="flex flex-row gap-6">
                <Button classname="w-16 bg-white border rounded-2xl" icon="facebook" />
                <Button classname="w-16 bg-white border rounded-2xl" icon="google" />
            </View>
            <View className="flex flex-row">
                <Text className="text-black">Não tem uma conta? </Text><Link href="/accountCreationSelectScreen" className="font-semibold text-black">Cadastre-se</Link>
            </View>

        </View>
    );
}