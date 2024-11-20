// HeartIcon.tsx
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeartIconProps {
  // Para definir se o álbum está favoritado ou não
  isFavorited: boolean;
  // Função de callback para mudar o estado de favoritado
  onToggleFavorite: () => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({ isFavorited, onToggleFavorite }) => {
  return (
    <Icon
      name={isFavorited ? 'heart' : 'heart-outline'} // Se for favoritado, usa o coração cheio, senão o outline
      size={20}
      color={isFavorited ? 'red' : 'gray'} // Cor vermelha se favoritado, caso contrário cinza
      onPress={onToggleFavorite} // Altera o estado ao clicar
      style={{ marginRight: 10 }}
    />
  );
};

export default HeartIcon;
