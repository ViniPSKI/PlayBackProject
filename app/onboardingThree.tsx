import { Image, Text, View } from "react-native";
import { Link, router } from 'expo-router';
import Button from "./components/Button";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function OnboardingThree() {
    return(
        <View className="flex-1 h-full" style={{ backgroundColor:"#FFFFFF" }}>
            <Image className="h-[60%] w-full" source={require('@/assets/images/onboardingThreeImage.png')} />

            <View className="flex-1 w-full items-start justify-normal p-6">
                <Text className="text-black font-bold text-xl" >Avalie e Compartilhe</Text>
                <Text className="text-black">Dê notas aos seus álbuns favoritos e escreva resenhas para compartilhar suas opiniões com outros apaixonados por música.</Text>
                <Button icon="arrow-right" iconColor="white" classname="absolute bg-light-blue p-3" style={{ position: 'absolute', bottom: 30, right: 30,  width: 60, height: 60, borderRadius: 30 }} onPress={() => router.push('/homeScreen')}
/>
            </View>
        </View>
    );
}