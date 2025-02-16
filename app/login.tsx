import { View, Text, Image, Alert } from "react-native";
import Button from "./components/Button";
import Input from "./components/Input";
import { Link, router } from 'expo-router';
import { useState } from "react";
import { singIn, getUser, signOut } from './services/firebaseService';
import { useAuth } from "./contexts/auth/AuthProvider";
import  AsyncStorage  from "@react-native-async-storage/async-storage";

export default function LoginScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('')
    const { setUserData, userData } = useAuth();

    async function saveUserStorage(uid: string) {
        setUser(uid);
        await AsyncStorage.setItem('user', uid);
    }

    async function login() {
        const userId = await singIn(email, password) as string;
        const user = await getUser(userId);
        if(user){
            setUserData({
                uid: userId,
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
                password: user.password,
                username: user.username,
                bio: user.bio,
                followers: user.followers,
                following: user.following 
            });
            await saveUserStorage(userId);
            router.push('/initialScreen');
        }
    }

    return(
        <View className="flex-1 items-center gap-4 bg-white">
            <Image className="py-4 mt-12" source={require('@/assets/images/loginImage.png')} />
            <View className="flex items-center">
                <Text className="font-bold text-2xl">Seja bem vindo!</Text>
                <Text className="font-light">Digite suas credenciais para acessar</Text>
            </View>
            <Input placeholder="Email" classname="w-[90%] py-1 rounded-lg border" icon="email-outline" onChangeText={setEmail} />
            <Input placeholder="Senha" classname="w-[90%] py-1 rounded-lg border" icon="lock" password={true} onChangeText={setPassword} />
            <Button onPress={login} textButton="Logar" classname="w-[60%] h-12 bg-blue" textStyle="text-white" />
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