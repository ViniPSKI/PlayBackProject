import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void; 
  isDisabled?: boolean; 
}

const StarRating: React.FC<StarRatingProps> = ({ 
  initialRating = 0, 
  onRatingChange, 
  isDisabled = false 
}) => {
  const [rating, setRating] = useState(initialRating);

  const handlePress = (index: number) => {
    if (isDisabled) return; 
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[0, 1, 2, 3, 4].map((index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(index)} disabled={isDisabled}>
          <Icon name={index < rating ? 'star' : 'star-outline'} size={25} color={index < rating ? '#FFD700' : '#ccc'} style={{ marginRight: 5 }}/>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
