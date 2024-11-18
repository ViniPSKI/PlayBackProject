import { Image, Text, View } from "react-native";
import Button from "./components/Button";
import { Link, router } from 'expo-router';

export default function AccountCreationSelect(){
    return(
        <View className="flex-1 items-center gap-4 bg-white">
            <Image className="py-4 mt-12" source={require('@/assets/images/loginImage.png')} />
            <Text className="font-bold text-2xl mb-10">Criar uma conta</Text>
            <Button classname="w-[90%] border border-gray" textButton="Entrar com o Facebook" icon="facebook" textStyle="font-light" />
            <Button classname="w-[90%] border border-gray" textButton="Entrar com o Google" icon="google" />
            <Button onPress={()=> router.push('/createAccount')} classname="w-[90%] border border-gray" textButton="Cadastrar-se com e-mail" icon="email-outline" />
        </View> 
    );
}