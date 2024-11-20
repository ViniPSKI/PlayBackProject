import { Image, ScrollView, Text, View } from "react-native";
import { albuns, albunsNovos } from "../moks/albums";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import StarRating from '../components/StarRating';
import HeartIcon from "../components/HeartIcon";
import InputReview from "../components/InputReview";
import Button from "../components/Button";

export default function InitialScreen(){
    const userLogado = "Eduarda";
    const albun: Album[] = albuns;
    const albunsNew: Album[] = albunsNovos;

    const [rating, setRating] = useState(0);
    const handleRatingChange = (newRating: number) => {
        setRating(newRating);  // Atualiza o estado com a nova avaliação
    };
    
    const [isFavorited, setIsFavorited] = useState(false);
    const toggleFavorite = () => {
        setIsFavorited(prev => !prev);
    };

    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = () => {
        console.log("Título:", title);
        console.log("Review:", review);
    };

    return(
        <ScrollView >
            <View className="flex gap-3 m-10">
                <View className="flex-row items-center w-full">
                    <Icon name="arrow-left" size={20} className="w-[20%]" />
                    <Text className="font-semibold text-2xl flex-1 text-center">{albunsNew[0].nome}</Text>
                    <Button onPress={() => router.push('/initialScreen')} textButton="Publicar" classname="h-10 bg-blue" textStyle="text-white" />
                </View>
                
                <View className="bg-light-gray rounded-lg p-3 gap-2 mt-8">
                    <View className="flex flex-row gap-4 h-23">
                        <Image width={80} height={80} source={{uri:albunsNew[0].imgLink}} className="rounded-md" />
                        <View className="flex flex-col justify-center">
                            <Text className="font-medium text-lg">{albunsNew[0].nome}</Text>
                            <Text className="text-md" style={{ color: '#808080' }}>{albunsNew[0].autor + " - Álbum"}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <StarRating initialRating={rating} onRatingChange={handleRatingChange} />
                    <HeartIcon isFavorited={isFavorited} onToggleFavorite={toggleFavorite} />
                </View>

                <View className="mt-10">
                    {/* Campo para título */}
                    <InputReview
                        placeholder="Título da review"
                        classname="mb-1" // Adicionando margem
                        classnameText="text-lg font-bold"
                        multiline={false}
                        placeholderTextColor="black"
                    />

                    {/* Campo para review */}
                    <InputReview
                        placeholder="Fale o que você achou do álbum..."
                        classname="mb-4"
                        multiline={true}
                    />
                </View>
            </View>
        </ScrollView>
    );
}