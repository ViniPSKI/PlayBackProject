import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { useRouter } from 'expo-router'; // Hook para navegação

interface BackButtonProps {
  classname?: string;
  iconSize?: number; // Tamanho do ícone
  iconColor?: string; // Cor do ícone
  textStyle?: string; // Estilo do texto
}

export default function BackButton({
  classname,
  iconSize = 24, // Tamanho padrão da flecha
  iconColor = 'black', // Cor padrão da flecha
  textStyle,
  ...props
}: BackButtonProps) {
  const router = useRouter(); // Hook de navegação

  const defaultStyle = 'items-center justify-center rounded-md flex-row';

  return (
    <TouchableOpacity
      className={`${defaultStyle} ${classname}`}
      onPress={() => router.back()} // Navega para a página anterior
      {...props}
    >
      <Icon
        name="arrow-left" // Nome do ícone de seta
        size={iconSize}
        color={iconColor}
        style={{ marginRight: textStyle ? 8 : 0 }} // Adiciona um espaço se houver texto
      />
    </TouchableOpacity>
  );
}
