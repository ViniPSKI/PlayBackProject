import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { albunsNovos } from "../moks/albums";
import { Tracklist } from "../moks/tracklist";
import { Reviews } from "../moks/reviews";
import { Usuarios } from "../moks/usuarios"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from "../components/Header";
import Button from "../components/Button"
import React, { useState } from 'react';
import StarRating from "../components/StarRating";
import Avatar from "../components/Avatar";
import HeartIcon from "../components/HeartIcon";
import { router } from "expo-router";

export default function InitialScreen() {
  const userLogado = "Eduarda";

  const album = albunsNovos[0];
  const tracklist = Tracklist;
  const reviews = Reviews;
  const usuarios = Usuarios[0];

  const [isExpanded, setIsExpanded] = useState(false);

  const verTodos = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ScrollView>
        <View className="flex bg-white">
            <View className="flex gap-3 rounded-b-[50px] bg-extra-light-gray pb-10">
                <Header 
                    title={album.nome} 
                    onBackPress={() => router.push("/(tabs)/initialScreen")}
                />
                <View style={{alignItems: 'center'}} className="flex gap-3">
                    <Image 
                        width={220} 
                        height={240} 
                        source={{uri: album.imgLink}} 
                        className="rounded-lg" 
                    />
                    <Text className="text-[30px]">{album.nome}</Text>
                    <Text className="text-[15px] color-gray">Álbum · {album.ano} · {album.qtdMusica} músicas</Text>
                </View>
                
                <View className="flex-row justify-center items-center space-x-4 gap-3 mt-5">
                    <Button 
                        textButton="Avaliar" classname="w-[42%] bg-blue h-[40px]" 
                        icon="star" iconSize={25} iconColor="white"
                        textStyle="text-white  text-lg" 
                        onPress={()=> router.navigate("/components/reviewScreen")}
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
                        <Text className="text-[16px] font-bold">{album.avaliacoes}</Text>
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
                    {tracklist.slice(0, isExpanded ? tracklist.length : 4).map((a, key) => (
                        <View key={key} className="flex-row px-3 items-center">
                            <Text className="text-[16px] font-bold color-black mr-2 w-[5%]">{key + 1}</Text>
                            <Text className="text-[16px] w-[80%]" numberOfLines={1}>{a.nome}</Text>
                            <Text className="color-gray text-[14px] w-[10%]" numberOfLines={1}>{a.duracao}</Text>
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
                    <View className="bg-extra-light-gray rounded-2xl p-4 gap-2 mb-10 w-[100%]">
                        <Text className="text-[16px]">{a.titulo}</Text>
                        <StarRating initialRating={a.estrelas} isDisabled={true}/>
                        <Text className="text-[15px] color-gray">{a.comentario}</Text>
                        <View className="flex-row justify-around items-center mt-3">
                            <Avatar urlImg={usuarios.imgPerfil} size={20}/>
                            <Text className="text-[12px] pl-2 ml-3 w-[50%]">{usuarios.nome}</Text>
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
