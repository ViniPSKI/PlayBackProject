import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface SearchCardsProps {
    image: string;
    text: string; 
    color: string;
    onPress?: () => void; 
}

const SearchCards: React.FC<SearchCardsProps> = ({ image, text, color, onPress }) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={{
                backgroundColor: color || "#f0f0f0",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image 
                source={{ uri: image }} 
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                    marginBottom: 5,
                }} 
            />
            <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default SearchCards;
