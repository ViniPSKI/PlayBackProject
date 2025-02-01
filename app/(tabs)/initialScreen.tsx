import { Image, ScrollView, Text, View } from "react-native";
import Input from "../components/Input";
import { albuns, albunsNovos } from "../moks/albums";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeartIcon from "../components/HeartIcon";
import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { router } from "expo-router";
import Button from "../components/Button";
import UsePeriodOfDay from "../hooks/usePeriodOfDay";
import StarRating from "../components/StarRating";
import { useAuth } from "../contexts/auth/AuthProvider";

export default function InitialScreen(){
    const [albumsTrending, setAlbumsTrending] = useState<Album[]>([]);

    const fetchTrendingAlbums = async () => {
        try {
            const response = await fetch("https://api.deezer.com/chart/0/albums");
            const data = await response.json();
            setAlbumsTrending(data.data.slice(0, 3));
        } catch (error) {
            console.error("Erro ao buscar álbuns em alta:", error);
        }
    };

    useEffect(() => {
        fetchTrendingAlbums();
    }, []);
    const albun: Album[] = albuns;
    const albunsNew: Album[] = albunsNovos;

    const messageWelcome = UsePeriodOfDay();
    const { firebaseUser, userData, loading } = useAuth();

    const [isFavorited, setIsFavorited] = useState(false);
    const toggleFavorite = () => {
        setIsFavorited(prev => !prev);
    };

    return(
        <ScrollView >
            <View className="flex gap-3 m-4 mt-10">
            <View className="flex flex-row justify-between">
                <Text className="text-2xl">{messageWelcome}, {userData?.nome}!</Text>
                <Button className="bg-blue rounded-full w-max p-2" iconColor="white" icon="bell-outline" />
            </View>
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
            <View className="flex flex-row justify-between">
                <Text>Em alta</Text>
                <Text className="text-xs font-extralight justify-end">Ver todos</Text>
            </View>
            <View className="bg-light-gray rounded-lg p-3 flex flex-row justify-around">
                {albumsTrending.map((album) => (
                    <View onTouchEnd={()=> router.push("/components/album")} key={album.id} className="max-w-[25%] flex items-center justify-center">
                    <Image
                        width={60}
                        height={60}
                        source={{ uri: album.cover_medium }}
                        className="rounded-md"
                    />
                    <Text className="overflow-hidden whitespace-nowrap w-[95%] text-center" numberOfLines={1}>
                        {album.title}
                    </Text>
                    <Text className="font-extralight text-xs">{album.artist.name}</Text>
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
                    <StarRating isDisabled={true} initialRating={3} />
                </View>
                <Text className="font-extralight text-xs">
                    Taylor revive 1989 com vocais melhores e novas faixas, deixando tudo ainda mais icônico e moderno. TAYMOTHER!!
                </Text>
                <View className="flex flex-row justify-between">
                    <View className="flex flex-row gap-2">
                        <Avatar size={20} urlImg="https://i.pinimg.com/236x/4c/20/2b/4c202b6376037a5fc660a6c7b6e55661.jpg" />
                        <Text className="text-[12px]">Sabrina C.</Text>
                    </View>
                    <View className="flex flex-row gap-4 justify-end">
                        <HeartIcon isFavorited={isFavorited} onToggleFavorite={toggleFavorite} size={20} />
                        <Icon size={20} name="comment-text-multiple-outline"></Icon>
                        <Icon size={20} name="share-variant-outline"></Icon>
                    </View>
                </View>
            </View>
            </View>
        </ScrollView>
    );
}