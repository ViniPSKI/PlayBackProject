import { Image, Text, View } from "react-native";
import { Link, router } from 'expo-router';
import Button from "./components/Button";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function OnboardingOne() {
    return(
        <View className="flex-1 h-full" style={{ backgroundColor:"#FFFFFF" }}>
            <Image className="h-[60%] w-full" source={require('@/assets/images/onboardingOneImage.png')} />

            <View className="flex-1 w-full items-start justify-normal p-6">
                <Text className="text-black font-bold text-xl">Descubra Músicas Novas</Text>
                <Text className="text-black">Explore álbuns e artistas recomendados pela comunidade. Mergulhe em novas experiências musicais com base nas suas preferências.</Text>
                <Button icon="arrow-right" iconColor="white" classname="absolute bg-green p-3" style={{ position: 'absolute', bottom: 30, right: 30,  width: 60, height: 60, borderRadius: 30 }} onPress={() => router.push('/onboardingTwo')}
/>
            </View>
        </View>
    );
}