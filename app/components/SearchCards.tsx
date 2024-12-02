import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface SearchCardsProps {
  image: string;
  color: string;
  text: string;
  onPress?: () => void;
}

export default function SearchCards ({ image, color, text, onPress } : SearchCardsProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: color }]}>
      <View className='' >
        <Text style={styles.text}>{text}</Text>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    card: {
        width: '47%',
        height: 100,
        marginBottom: 15,
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
        position: 'relative',
      },
      image: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 8, 
        zIndex: 0,
        left: 90,
      },
      text: {
        width: '60%',
        position: 'absolute',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        zIndex: 1,
        top: 25,
        left: 5
      },
});

