import { Image, Text, View } from "react-native";
import Button from "./components/Button";
import { Link, router } from 'expo-router';
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { useAuth } from "./contexts/auth/AuthProvider";
import { useEffect, useState } from "react";
import { singIn, getUser } from './services/firebaseService';

export default function HomeScreen(){
    const { setUserData, userData } = useAuth();
    const [user, setUser] = useState('');

    useEffect(()=>{
        loadUserStorage();
    },[]);

    async function loadUserStorage() {
        const value = await AsyncStorage.getItem('user')
        if(value){
            setUser(value);
            const userStorage = await getUser(value);
            if (userStorage){
                await singIn(userStorage.email, userStorage.password);
                setUserData({
                    uid: value,
                    nome: userStorage.nome,
                    sobrenome: userStorage.sobrenome,
                    email: userStorage.email,
                    password: userStorage.password,
                });
                router.push('/initialScreen');
            }
        }
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