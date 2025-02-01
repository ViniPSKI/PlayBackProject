import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface SearchCardsProps {
    image: string;
    color: string;
    text: string;
    artistName?: string; 
    type?: string;
    onPress?: () => void;
}

export default function SearchCardsAPI({ image, color, text, artistName, type, onPress }: SearchCardsProps) {
    return (
        <TouchableOpacity onPress={onPress} className="bg-extra-light-gray p-3 flex-row justify-around rounded-lg items-center">
            <Image 
                width={70} 
                height={75} 
                source={{ uri: image }} 
                className="rounded-lg" 
            />
            <View className="ml-4 flex-col w-[69%]">
                <Text className="text-[15px]">{text}</Text>
                {artistName && (
                    <Text className="text-[15px] color-gray">{artistName} · {type}</Text>
                )}
            </View>
            <Icon name="chevron-right" size={40} color="gray" />
        </TouchableOpacity>
    );
}
