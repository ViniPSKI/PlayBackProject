import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { albunsNovos } from "../moks/albums";
import { Reviews } from "../moks/reviews";
import { Usuarios } from "../moks/usuarios"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from "../components/Header";
import Button from "../components/Button"
import React, { useState, useEffect } from 'react';
import StarRating from "../components/StarRating";
import Avatar from "../components/Avatar";
import HeartIcon from "../components/HeartIcon";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Review } from "../interfaces/review";
import { getReviewsAlbum } from "../services/reviewService";
import { ReviewCompleta } from "../interfaces/reviewCompleta";
import { getUser } from "../services/firebaseService";

export default function InitialScreen() {
  const userLogado = "Eduarda";

  const album = albunsNovos[0];
  const usuarios = Usuarios[0];

  const { albumParametro } = useLocalSearchParams();

  const albumParm = albumParametro ? JSON.parse(albumParametro as string) : null;

  if (!albumParm) {
    return <Text>Erro ao carregar o álbum!</Text>;
  }

  const [tracklist, setTracklist] = useState<TrackList[]>([]);

  const buscaTrackList = async (link: string) => {
    try {
      const response = await fetch(link);
      const data = await response.json();
      return data.data || [];
    } catch (e) {
      console.error("Erro ao buscar tracklist:", e);
      return [];
    }
  };

  useEffect(() => {
    const carregarTracklist = async () => {
      if (albumParm && albumParm.tracklist) {
        const tracklistData = await buscaTrackList(albumParm.tracklist);
        setTracklist(tracklistData); 
      }
    };

    carregarTracklist();
  }, []); 

  const [isExpanded, setIsExpanded] = useState(false);

  const verTodos = () => {
    setIsExpanded(!isExpanded);
  };

  function minutos(segundos: number): string {
    const minutos = Math.floor(segundos / 60);
    const segundosResto = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosResto).padStart(2, '0')}`;
  }


  const [reviews, setReviews] = useState<ReviewCompleta[]>([]);

  const loadReviews = async () => {
      if (albumParm?.id) {
            try {
                const reviews: Review[] = await getReviewsAlbum(albumParm.id);
                const reviewPromises = reviews.map(async (review) => {
                    const userData = await getUser(review.idUsuario);
                    return { ...review, userData };
                });
                const reviewsComUser = await Promise.all(reviewPromises);
                setReviews(reviewsComUser);
            } catch (error) {
                console.error("Erro ao carregar reviews:", error);
            }
        }
    };
  
    useEffect(() => {
        if (albumParm?.id) {
          loadReviews();
        }
    }, [albumParm]);

  return (
    <ScrollView>
        <View className="flex bg-white">
            <View className="flex gap-3 rounded-b-[50px] bg-extra-light-gray pb-10">
                <Header 
                    title={albumParm.title} 
                    onBackPress={() => router.back()}
                />
                <View style={{alignItems: 'center'}} className="flex gap-3">
                    <Image 
                        width={220} 
                        height={240} 
                        source={{uri: albumParm.cover_medium}} 
                        className="rounded-lg" 
                    />
                    <Text className="text-[30px] text-center">{albumParm.title}</Text>
                    <Text className="text-[15px] color-gray">{albumParm.type} · {album.ano} · {tracklist.length} músicas</Text>
                </View>
                
                <View className="flex-row justify-center items-center space-x-4 gap-3 mt-5">
                    <Button 
                        textButton="Avaliar" classname="w-[42%] bg-blue h-[40px]" 
                        icon="star" iconSize={25} iconColor="white"
                        textStyle="text-white  text-lg" 
                        onPress={() => router.push({ pathname: './reviewScreen', params: { album: JSON.stringify(albumParm) } })}
                    />
                    <Button  
                        classname="w-[16%] bg-blue h-[40px]" 
                        icon="dots-horizontal" iconSize={25} iconColor="white"
                    />
                    <Button 
                        classname="w-[16%] bg-blue h-[40px]" 
                        icon="forum-outline" iconSize={25} iconColor="white"
                    />
                </View>

                <View className="flex-row justify-around mt-5 ml-3 mr-3">
                    <View className="flex-col justify-center items-center">
                        <Text className="text-[16px] font-bold">{reviews.length}</Text>
                        <Text className="text-[14px]">avaliações</Text>
                    </View>
                    <View className="flex-col justify-center items-center mx-20">
                        <View className="flex-row">
                            <Icon name="star" size={20} color="gold" className="mr-2" /> 
                            <Text className="text-[16px] font-bold">{album.totalEstrelas / album.avaliacoes}/5</Text>
                        </View>
                        <Text className="text-[14px]">nota média</Text>
                    </View>
                    <View className="flex-col justify-center items-center">
                        <View className="flex-row">
                        <Icon name="star" size={20} color="gold" className="mr-2" /> 
                            <Text className="text-[16px] font-bold">-/5</Text>
                        </View>
                        <Text className="text-[14px]">sua nota</Text>
                    </View>
                </View>
            </View>
        
            <View className="mx-16 mt-6">
                <Text className="font-bold text-[20px]">Tracklist</Text>
                <View className="bg-extra-light-gray rounded-2xl px-7 pt-7 pb-3 gap-2">
                    {tracklist.slice(0, isExpanded ? tracklist.length : 4).map((a:TrackList, key: number) => (
                        <View key={key} className="flex-row px-3 items-center">
                            <Text className="text-[16px] font-bold color-black mr-2 w-[5%]">{key + 1}</Text>
                            <View className="w-[80%] flex-row">
                                <Text className="text-[16px] mr-1" numberOfLines={1}>{a.title}</Text>
                                {a.explicit_lyrics ? (<MaterialIcons name="explicit" size={20} color="gray" />):(<></>)}
                            </View>
                            <Text className="color-gray text-[14px] w-[10%]" numberOfLines={1}>{minutos(a.duration)}</Text>
                            <Icon name="play-circle" size={17} color="gray" className="mr-2 w-[10%]" />
                        </View>
                    ))}
                    
                    <TouchableOpacity onPress={verTodos}>
                        <Text className="color-gray mt-3">{isExpanded ? "Ver menos" : "Ver tracklist toda..."}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
            <View className="mx-16 mt-6">
                <Text className="font-bold text-[20px] pb-2">Reviews</Text>
                {reviews.map((a, key) => (
                    <View key={key} className="bg-extra-light-gray rounded-2xl p-4 gap-2 mb-10 w-[100%]">
                        <Text className="text-[16px]">{a.title}</Text>
                        <StarRating initialRating={a.rating} isDisabled={true}/>
                        <Text className="text-[15px] color-gray">{a.review}</Text>
                        <View className="flex-row justify-around items-center mt-3">
                            <Avatar urlImg={usuarios.imgPerfil} size={20}/>
                            <Text className="text-[12px] pl-2 ml-3 w-[50%]">{a.userData?.nome || "Perfil"} {a.userData?.sobrenome || ""}</Text>
                            <View className="w-[50%] flex-row justify-around items-center">
                                <HeartIcon isFavorited={true} size={22} onToggleFavorite={()=>0}/>
                                <Icon name="message-reply-text-outline" size={22} color="gray"/>
                                <Icon name="share-variant-outline" size={22} color="gray" className="ml-[12px]" />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    </ScrollView>
  );
}
