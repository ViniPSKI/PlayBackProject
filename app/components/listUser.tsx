import { View } from "react-native";
import { User } from "../interfaces/user";
import Avatar from "./Avatar";
import { Text } from "react-native";
import Button from "./Button";

export default function ListUser(userList: User){
    return(
        <View className="p-2 flex flex-row items-center gap-4 border border-light-gray rounded-lg">
            <Avatar urlImg="https://picsum.photos/35" size={35} />
            <View className="">
                <Text className="font-semibold">{userList.username}</Text>
                <Text className="font-extralight">{userList.nome} {userList.sobrenome}</Text>
            </View>
            <View className="w-full mr-1">
                <Button 
                    textButton="Deixar de seguir" 
                    classname="w-[38%] bg-blue p-1 mr-2" 
                    textStyle="text-white text-[12px]" />
            </View>
        </View>
    );
}