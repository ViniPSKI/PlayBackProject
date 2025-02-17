import { Text, View } from "react-native";
import { useAuth } from "./contexts/auth/AuthProvider";
import { User } from "./interfaces/user";
import { useEffect, useState } from "react";
import { getUser } from "./services/firebaseService";
import ListUser from "./components/listUser";

export default function FallowersList(){
    const { userData } = useAuth();
    const [followersList, setFollowersList] = useState<User[]>([]);

    async function getUsersFollowing() {
        const userPromises = (userData?.followers?.map((userId) => getUser(userId))) as [];
        const users = await Promise.all(userPromises);
        setFollowersList(users);
    }

    useEffect(()=>{
        getUsersFollowing();
    },[])
    
    return(
        <View className="p-2 flex gap-2">
            <Text className="font-medium text-xl text-center">Seguem você</Text>
            {followersList.map((user, key)=>(
                <ListUser key={key} {...user} />
            ))}
        </View>
    );
}