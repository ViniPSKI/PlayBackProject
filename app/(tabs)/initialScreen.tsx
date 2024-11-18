import { Image, ScrollView, Text, View } from "react-native";
import Input from "../components/Input";
import { albuns, albunsNovos } from "../moks/albums";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InitialScreen(){
    const userLogado = "Eduarda";
    const albun: Album[] = albuns;
    const albunsNew: Album[] = albunsNovos;

    return(
        <ScrollView >
            <View className="flex gap-3 m-4 mt-10">
            <Text>Boa noite, {userLogado}</Text>
            <Input placeholder="O que você está ouvindo?" classname="bg-light-gray w-full p-1 border-light-gray"></Input>
            <View className="bg-light-gray rounded-lg p-3 gap-2">
                <View className="flex flex-row gap-4">
                    <Image width={40} height={40} source={{uri:albunsNew[0].imgLink}} className="rounded-md" />
                    <View>
                        <Text className="font-medium text-lg">{albunsNew[0].nome}</Text>
                        <Text className="text-sm">{albunsNew[0].autor}</Text>
                    </View>
                </View>
                <Text className="font-extralight text-center text-xs">{albunsNew[0].descricao}</Text>
            </View>
            <View className="flex flex-row">
                <Text>Em alta</Text>
                <Text className="text-xs font-extralight justify-end">Ver todos</Text>
            </View>
            <View className="bg-light-gray rounded-lg p-3 flex flex-row justify-around">
                {albun.map((a, key)=>(
                    <View key={key} className="max-w-[25%] flex items-center justify-center">
                        <Image width={40} height={40} source={{uri:a.imgLink}} className="rounded-md" />
                        <Text className="overflow-hidden whitespace-nowrap w-[95%] text-center" numberOfLines={1}>{a.nome}</Text>
                        <Text className="font-extralight text-xs">{a.autor}</Text>
                    </View>
                ))}
            </View>
            <Text>Timeline</Text>
            <View className="bg-light-gray rounded-md p-2 gap-1">
                <View className="bg-snow p-2 rounded-md">
                    <View className="flex flex-row gap-4">
                        <Image width={40} height={40} source={{uri:albunsNew[0].imgLink}} className="rounded-md" />
                        <View>
                            <Text className="">{albunsNew[0].nome}</Text>
                            <Text className="text-xs font-extralight">{albunsNew[0].autor}</Text>
                        </View>
                    </View>
                </View>
                <Text className="font-light text-sm">
                    NOSTALGIA RENOVADAAAAAAA
                </Text>
                <View>
                    <Text>Estrelas</Text>
                </View>
                <Text className="font-extralight text-xs">
                    Taylor revive 1989 com vocais melhores e novas faixas, deixando tudo ainda mais icônico e moderno. TAYMOTHER!!
                </Text>
                <View className="flex flex-row justify-between">
                    <View className="flex flex-row gap-2">
                        <Image width={15} height={15} source={{uri:"https://i.pinimg.com/236x/4c/20/2b/4c202b6376037a5fc660a6c7b6e55661.jpg"}} className="rounded-full" />
                        <Text className="text-[9px]">Sabrina C.</Text>
                    </View>
                    <View className="flex flex-row gap-4 justify-end">
                        <Icon name="heart-multiple"></Icon>
                        <Icon name="comment-text-multiple-outline"></Icon>
                        <Icon name="share-variant-outline"></Icon>
                    </View>
                </View>
            </View>
            </View>
        </ScrollView>
    );
}