// StarRating.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Definindo o tipo para as props do componente
interface StarRatingProps {
  initialRating?: number; // Avaliação inicial (opcional)
  onRatingChange?: (rating: number) => void; // Função de callback para quando a avaliação mudar
  isDisabled?: boolean; // Nova prop para desativar a interação
}

const StarRating: React.FC<StarRatingProps> = ({ 
  initialRating = 0, 
  onRatingChange, 
  isDisabled = false 
}) => {
  const [rating, setRating] = useState(initialRating); // Inicializa com o valor passado de 'initialRating'

  // Função para lidar com o clique na estrela
  const handlePress = (index: number) => {
    if (isDisabled) return; // Se o componente estiver desativado, ignora a interação
    const newRating = index + 1; // O índice começa em 0, mas queremos que a estrela 1 seja index 1
    setRating(newRating); // Atualiza o estado com o novo valor
    if (onRatingChange) {
      onRatingChange(newRating); // Chama a função de callback no componente pai
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
