import { ActivityIndicator, Image, Text, View } from "react-native";
import Button from "./components/Button";
import { Link, router } from 'expo-router';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useAuth } from "./contexts/auth/AuthProvider";
import { useEffect, useState } from "react";
import { singIn, getUser } from './services/firebaseService';

export default function HomeScreen(){
    const { setUserData, userData } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        loadUserStorage();
    },[]);

    async function loadUserStorage() {
        const value = await AsyncStorage.getItem('user')
        if(value){
            setIsLoading(true);
            const userStorage = await getUser(value);
            if (userStorage){
                await singIn(userStorage.email, userStorage.password);
                setUserData({
                    uid: value,
                    nome: userStorage.nome,
                    sobrenome: userStorage.sobrenome,
                    email: userStorage.email,
                    password: userStorage.password,
                    username: userStorage.username,
                    bio: userStorage.bio,
                    followers: userStorage.followers,
                    following: userStorage.following 
                });
                router.push('/initialScreen');
            }
        }else{
            setUserData(null);
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-[#3048EA]">
                <ActivityIndicator size="large" color="white" />
                <Text className="text-white mt-4">Carregando...</Text>
            </View>
        );
    }

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