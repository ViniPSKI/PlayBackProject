import { Image, ScrollView, Text, View } from "react-native";
import Input from "../components/Input";
import { albunsNovos } from "../moks/albums";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeartIcon from "../components/HeartIcon";
import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { router } from "expo-router";
import Button from "../components/Button";
import UsePeriodOfDay from "../hooks/usePeriodOfDay";
import StarRating from "../components/StarRating";
import { useAuth } from "../contexts/auth/AuthProvider";
import { ReviewCompleta } from "../interfaces/reviewCompleta";
import { Review } from "../interfaces/review";
import { getLastReviews } from "../services/reviewService";
import { getAlbumReview } from "../API/reviewAPI";
import { getUser } from "../services/firebaseService";
import { useRouter } from "expo-router";

export default function InitialScreen(){
    const albunsNew: Album_Teste[] = albunsNovos;

    const [albumsTrending, setAlbumsTrending] = useState<Album[]>([]);

    const fetchTrendingAlbums = async () => {
        try {
            const response = await fetch("https://api.deezer.com/chart/0/albums");
            const data = await response.json();
            setAlbumsTrending(data.data);
        } catch (error) {
            console.error("Erro ao buscar álbuns em alta:", error);
        }
    };

    useEffect(() => {
        fetchTrendingAlbums();
    }, []);

    const messageWelcome = UsePeriodOfDay();
    const { firebaseUser, userData, loading } = useAuth();

    const [isFavorited, setIsFavorited] = useState(false);
    const toggleFavorite = () => {
        setIsFavorited(prev => !prev);
    };

    const [reviews, setReviews] = useState<ReviewCompleta[]>([]);

    const clickAlbum = (album: Album) => {
        router.push({
            pathname: "/components/album",
            params: { albumParametro: JSON.stringify(album) },
          });
    };

    const clickUser = (uuid: string) => {
        if(uuid != userData?.uid){
            router.push({
                pathname: "/followerUser",
                params: { idUsuario: JSON.stringify(uuid) },
            });
        }
    };

    const loadReviews = async () => {
        if (userData?.uid) {
            try {
            const reviews: Review[] = await getLastReviews();
            const reviewPromises = reviews.map(async (review) => {
                const albumData = await getAlbumReview(review.albumId);
                const userData = await getUser(review.idUsuario);
                return { ...review, albumData, userData };
            });
            const reviewsComAlbums = await Promise.all(reviewPromises);

            const sortedReviews = reviewsComAlbums.sort((a, b) => {
                const dateA = new Date(a.createdAt); 
                const dateB = new Date(b.createdAt);
                return dateB.getTime() - dateA.getTime();
            });

            setReviews(sortedReviews);
            } catch (error) {
            console.error("Erro ao carregar reviews:", error);
            }
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    // validacoes para levar para a tela de pesquisa:
    const [textoPesquisa, setTextoPesquisa] = useState("");
    const router = useRouter();

    const handleSearch = (text: string) => {
        setTextoPesquisa(text);
        router.push({
        pathname: "/(tabs)/SearchScreen",
        params: { query: text },
        });
    };

    return(
        <ScrollView >
            <View className="flex gap-3 m-4 mt-10">
            <View className="flex flex-row justify-between">
                <Text className="text-2xl">{messageWelcome}, {userData?.nome}!</Text>
                <Button className="bg-blue rounded-full w-max p-2" iconColor="white" icon="bell-outline" />
            </View>
            <Input
                icon="magnify"
                placeholder="Procure..."
                classname="bg-light-gray w-full p-1 border-light-gray mb-8"
                value={textoPesquisa}
                onChangeText={setTextoPesquisa}
                onSubmitEditing={() => handleSearch(textoPesquisa)} 
            />
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
                <Text
                    className="text-xs font-extralight justify-end"
                    onPress={() => {
                        router.push({
                        pathname: "/(tabs)/SearchScreen",
                        params: { trendingAlbums: JSON.stringify(albumsTrending) },
                        });
                    }}
                    >
                    Ver todos
                </Text>
            </View>
            <View className="bg-light-gray rounded-lg p-3 flex flex-row justify-around">
                {albumsTrending.slice(0, 3).map((album) => (
                    <View onTouchEnd={()=> clickAlbum(album)} key={album.id} className="max-w-[25%] flex items-center justify-center">
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
            {reviews.map((review, key) => (
                <View key={key} className="bg-light-gray rounded-md p-2 gap-1">
                    <View className="bg-snow p-2 rounded-md">
                        <View className="flex flex-row gap-4">
                            <Image width={40} height={40} source={{ uri: review.albumData?.cover_medium || "fallback-image-url" }} className="rounded-md" />
                            <View>
                                <Text className="">{review.albumData?.title || "Título do Álbum"}</Text>
                                <Text className="text-xs font-extralight">{review.albumData?.artist.name || "Artista"}</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="font-light text-sm">
                        {review.title}
                    </Text>
                    <View>
                        <StarRating initialRating={review.rating} isDisabled={true}/>
                    </View>
                    <Text className="font-extralight text-xs">
                        {review.review}
                    </Text>
                    <View className="flex flex-row justify-between">
                        <View onTouchEnd={() => clickUser(review.idUsuario)} className="flex flex-row gap-2">
                            <Avatar size={20} urlImg="https://i.pinimg.com/236x/4c/20/2b/4c202b6376037a5fc660a6c7b6e55661.jpg" />
                            <Text className="text-[12px]">{review.userData?.nome || "Perfil"} {review.userData?.sobrenome || ""}</Text>
                        </View>
                        <View className="flex flex-row gap-4 justify-end">
                            <HeartIcon isFavorited={isFavorited} onToggleFavorite={toggleFavorite} size={20} />
                            <Icon size={20} name="comment-text-multiple-outline"></Icon>
                            <Icon size={20} name="share-variant-outline"></Icon>
                        </View>
                    </View>
                </View>
            ))}
            </View>
        </ScrollView>
    );
}