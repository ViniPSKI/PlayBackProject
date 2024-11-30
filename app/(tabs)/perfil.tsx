import { Image, ScrollView, Text, View } from "react-native";
import { albuns, albunsNovos } from "../moks/albums";
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

  const albun: Album[] = albuns; // albuns marcados como favorito
  const album = albunsNovos[0];  // precisa do album de cada review
  const reviews = Reviews; // reviews com o mesmo idusuario do perfil
  const usuario = Usuarios[1]; // pegar para cada idUsuario de cada Review

  return (
    <ScrollView>
    <View className="flex bg-white">
        <View className="flex gap-3 rounded-b-[50px] bg-extra-light-gray pb-10">
            <Header 
                title={usuario.arroba} 
                onBackPress={() => 0} //() => navigation.goBack()
            />
            <View className="flex-row gap-1 justify-center items-center mt-5">
                <Avatar urlImg={usuario.imgPerfil} size={75}/>
                <View className="ml-7 flex-col justify-center items-center w-[20%]">
                    <Text className="text-[20px] font-bold">{usuario.avaliacoes}</Text>
                    <Text className="text-[14px]">avaliações</Text>
                </View>
                <View className="flex-col justify-center items-center w-[20%]">
                    <Text className="text-[20px] font-bold">{usuario.seguidores}</Text>
                    <Text className="text-[14px]">seguidores</Text>
                </View>
                <View className="flex-col justify-center items-center w-[20%]">
                    <Text className="text-[20px] font-bold">{usuario.seguindo}</Text>
                    <Text className="text-[14px]">seguindo</Text>
                </View>
            </View>

            <View className="mx-[62px] mt-2">
                <Text className="text-[20px]">{usuario.nome}</Text>
                <Text className="mt-1 text-[14px] color-gray">{usuario.recado}</Text>
            </View>
            
            <View className="flex-row justify-center items-center space-x-4 gap-3 mt-5 mb-5">
                <Button 
                    textButton="Editar perfil" classname="w-[65%] bg-blue p-2 mr-3" 
                    textStyle="text-white text-[20px]" 
                />
                <Button  
                    classname="w-[10%] bg-blue h-[40px]" 
                    icon="share-variant-outline" iconSize={22} iconColor="white"
                />
            </View>

        </View>
     
        <View className="mx-16 mt-6">
            <Text className="font-bold text-[21px]">Meus <HeartIcon isFavorited={true} size={22} onToggleFavorite={()=>0}/> Favoritos</Text>
            <View className="bg-extra-light-gray rounded-3xl pt-7 pb-5 flex flex-row justify-around px-10">
                {albun.map((a, key)=>(
                    <View onTouchEnd={()=> router.push("/(tabs)/album")} key={key} className="w-[23%] items-center justify-center">
                        <Image width={90} height={95} source={{uri:a.imgLink}} className="rounded-lg" />
                        <Text className="overflow-hidden whitespace-nowrap w-[95%] text-center text-[17px]" numberOfLines={1}>{a.nome}</Text>
                        <Text className="font-extralight text-[13px]">{a.autor}</Text>
                    </View>
                ))}
            </View>
        </View>
      
        <View className="mx-10 mt-6">
            <Text className="font-bold text-[20px] mb-1">Últimas Reviews</Text>
            {reviews.map((a, key) => (
                <View className="gap-2 mb-10 rounded-lg">
                    <View className="bg-extra-light-gray py-2 flex-row  rounded-lg items-center">
                        <Image 
                            width={70} 
                            height={75} 
                            source={{uri: album.imgLink}} 
                            className="rounded-lg" 
                        />
                        <View className="ml-4 flex-col w-[69%]">
                            <Text className="text-[15px]">{album.nome}</Text>
                            <Text className="text-[15px] color-gray">{album.autor} · Álbum</Text>
                        </View>
                        <Icon name="play-circle" size={35} color="gray" className="" />
                    </View>
                    <Text className="text-[15px]">{a.titulo}</Text>
                    <View className="flex-row">
                        <StarRating initialRating={a.estrelas} isDisabled={true}/>
                        <HeartIcon isFavorited={true} size={22} onToggleFavorite={()=>0}/>
                    </View>
                    <Text className="text-[15px] color-gray">{a.comentario}</Text>
                </View>
            ))}
        </View>
    </View>
    </ScrollView>
  );
}
