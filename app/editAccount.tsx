import { useState } from "react";
import { Text, View } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";
import { useAuth } from "./contexts/auth/AuthProvider";
import { getUser, singIn, updateUser } from "./services/firebaseService";
import { router } from "expo-router";

export default function EditAccount(){
    const { setUserData, userData } = useAuth();

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    async function update() {
        if (!email || !nome || !sobrenome  ) {
            console.log('Erro', 'Todos os campos são obrigatórios!');
            return;
        }
        updateUser({nome: nome, sobrenome: sobrenome, email: email, bio: bio }, userData?.uid);
        const userStorage = await getUser(userData?.uid);
        if (userStorage){
            await singIn(userStorage.email, userStorage.password);
            setUserData({
                uid: userData?.uid,
                nome: userStorage.nome,
                sobrenome: userStorage.sobrenome,
                email: userStorage.email,
                password: userStorage.password,
                username: userStorage.username,
                bio: userStorage.bio
            });
        }
        router.back();
    }

    return(
        <View className="flex-1 items-center gap-4 bg-white top-1/4">
            <View className="w-[80%] flex flex-row items-center gap-4">
                <View className="w-[40%]">
                    <Text className="text-sm font-semibold mb-1">Nome</Text>
                    <Input
                        placeholder="Luana"
                        classname="py-1 px-3 rounded-lg w-full border"
                        onChangeText={setNome}
                        value={userData?.nome}
                    />
                </View>
                <View className="w-[55%]">
                    <Text className="text-sm font-semibold mb-1">Sobrenome</Text>
                    <Input
                        placeholder="Do Rei"
                        classname="px-2 rounded-lg w-full border"
                        onChangeText={setSobrenome}     
                        value={userData?.sobrenome}     
                    />
                </View>
            </View>
            <View className="w-[80%]">
                <View className="w-[100%]">
                    <Text className="text-sm font-semibold mb-1">Email</Text>
                    <Input
                    placeholder="luanadorei@email.com"
                    classname=" py-1 px-3 rounded-lg border"
                    onChangeText={setEmail}
                    value={userData?.email}
                    />
                </View>
            </View>
            <View className="w-[80%]">
                <View className="w-[100%]">
                    <Text className="text-sm font-semibold mb-1">Biografia</Text>
                    <Input
                        placeholder="Fale mais sobre você"
                        classname="px-3 rounded-lg w-full border"
                        onChangeText={setBio}
                        value={userData?.bio}
                    />
                </View>
            </View>
            <Button onPress={update} textButton="Editar" classname="w-[80%] bg-green" textStyle="text-white" />
            <Button onPress={() => {router.back()}} textButton="Cancelar" classname="w-[80%] bg-red" textStyle="text-white" />                
        </View>
    );
}