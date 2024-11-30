import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface SearchCardsProps {
  image: string;
  color: string;
  text: string;
  onPress?: () => void;
}

const SearchCards: React.FC<SearchCardsProps> = ({ image, color, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: color }]}>
      <View >
        <Text style={styles.text}>{text}</Text>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: {
        width: '47%', // Controla o tamanho do quadrado
        height: 100,  // Altura do card
        marginBottom: 15,
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        position: 'relative', // Necessário para o texto se sobrepor à imagem
      },
      image: {
        position: 'absolute',  // A imagem será posicionada no card
        width: 80, // Largura da imagem
        height: 80, // Altura da imagem
        borderRadius: 8,  // Imagem arredondada
        zIndex: 0,
        left: 90,
      },
      text: {
        width: '60%',
        position: 'absolute',  // O texto ficará sobre a imagem
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',  // Alinha o texto à esquerda
        zIndex: 1,
        top: 35,
        left: 5
      },
});

export default SearchCards;
