import { Image } from "react-native";

interface avatarProps{
    urlImg: string;
    size: number;
}

export default function Avatar({urlImg, size}:avatarProps){
   return(
    <Image width={size} height={size} source={{uri:urlImg}} className="rounded-full" />
   ) 
}