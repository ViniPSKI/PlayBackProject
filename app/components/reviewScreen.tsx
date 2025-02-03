import { Image, ScrollView, Text, View, Alert } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import StarRating from "../components/StarRating";
import HeartIcon from "../components/HeartIcon";
import Button from "../components/Button";
import Input from "../components/Input";
import { database } from "../../firebase";
import { useAuth } from "../contexts/auth/AuthProvider";
import { saveReview } from '../services/reviewService';

export default function ReviewScreen() {
  const { album } = useLocalSearchParams();
  const albumParm = album ? JSON.parse(album as string) : null;
  const { userData } = useAuth();

  if (!userData) {
    Alert.alert("Erro", "Você precisa estar logado para acessar essa funcionalidade.");
    router.replace("/login");
    return null;
  }

  if (!albumParm) {
    return <Text>Erro ao carregar o álbum!</Text>;
  }

  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const idUsuario = userData.uid;

  const handleRatingChange = (newRating: number) => setRating(newRating);

  const toggleFavorite = () => setIsFavorited((prev) => !prev);

  const handleSubmit = async () => {
    if (!title.trim() || !review.trim() || rating === 0) {
        Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        return;
    }
    if (!idUsuario) {
        Alert.alert("Erro", "Você precisa estar logado para publicar uma avaliação.");
        return;
    }
  
    try {
      const reviewData = {
        albumId: albumParm.id,
        rating,
        title,
        review,
        isFavorited,
        idUsuario,
      };
      await saveReview(reviewData);
      Alert.alert("Sucesso", "Sua avaliação foi publicada!");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar sua avaliação. Tente novamente.");
      console.error("Erro ao adicionar review:", error);
    }
  };
  

  return (
    <ScrollView>
      <View className="flex gap-3 m-10 p-3">
        <View className="flex-row items-center w-full justify-between">
          <Button
            icon="chevron-left"
            iconSize={30}
            iconColor="gray"
            onPress={() => router.back()}
          />
          <Text className="font-semibold text-2xl flex-1 text-center">
            {albumParm.title}
          </Text>
          <Button
            onPress={handleSubmit}
            textButton="Publicar"
            classname="h-8 bg-blue w-[25%]"
            textStyle="text-white"
          />
        </View>

        <View className="bg-light-gray rounded-lg p-3 gap-2 mt-8">
          <View className="flex flex-row gap-4 h-23">
            <Image
              width={80}
              height={80}
              source={{ uri: albumParm.cover_medium }}
              className="rounded-md"
            />
            <View className="flex flex-col justify-center">
              <Text className="font-medium text-lg">{albumParm.title}</Text>
              <Text className="text-md" style={{ color: "#808080" }}>
                {albumParm.artist.name + " - " + albumParm.type}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <StarRating initialRating={rating} onRatingChange={handleRatingChange} />
          <HeartIcon isFavorited={isFavorited} onToggleFavorite={toggleFavorite} />
        </View>

        <View className="mt-10">
          <Input
            placeholder="Título da review"
            styleTextInput="text-lg font-bold"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <Input
            placeholder="Fale o que você achou do álbum..."
            multiline={true}
            value={review}
            onChangeText={(text) => setReview(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
}
