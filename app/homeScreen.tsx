import { Image, Text, View } from "react-native";
import Button from "./components/Button";
import { Link, router } from 'expo-router';

export default function HomeScreen(){
    return(
    <View
        className="flex-1 h-full"
        style={{
            backgroundColor:"#3048EA"
        }}
        >
        <Image className="h-[70%]" source={require('@/assets/images/initialImage.png')} />
        <View className="flex-1 w-full items-center justify-center">
            <Button textButton="Entrar" classname="flex p-3 w-[80%] bg-snow" onPress={() => router.push('/login')} />
            <View className="flex flex-row justify-center mt-4">
            <Text className="text-snow">Não tem uma conta? </Text><Link href="/accountCreationSelectScreen" className="font-semibold text-snow">Cadastre-se</Link>
        </View>
        </View>
    </View>
    );
}