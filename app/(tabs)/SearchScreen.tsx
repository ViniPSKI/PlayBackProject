import { Image, ScrollView, Text, View } from "react-native";
import Input from "../components/Input";
import { albuns, albunsNovos } from "../moks/albums";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from "../components/BackButton";
import SearchInput from "../components/SearchInput";
import { Topicos } from "../moks/topicosPesquisa";
import SearchCards from "../components/SearchCards";

export default function InitialScreen(){
    const userLogado = "Eduarda";
    const albun: Album[] = albuns;
    const albunsNew: Album[] = albunsNovos;
    const topicos = Topicos;

    const EmAlta = topicos.slice(0, 2);  // Primeiro 5 itens
    const TopListas = topicos.slice(2, 6);  // Próximos 5 itens
    const ParaVoce = topicos.slice(6, 8);  // Itens subsequentes

    return(
        <ScrollView >
            <View className="flex gap-3 m-4 mt-10 p-5">
                <Text className="font-semibold text-2xl flex-1 text-center mb-8">Pesquisa</Text>
                <SearchInput placeholder="Procure..." classname="bg-light-gray w-full p-1 border-light-gray mb-8" />
                <View>
                    <View className="flex flex-row">
                        <Text className="font-semibold pb-2">Em alta</Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        }}
                    >
                        {EmAlta.map((style, index) => (
                        <SearchCards
                            key={index}
                            image={style.imgLink}
                            color={style.cor}
                            text={style.texto}
                        />
                        ))}
                    </ScrollView>

                    <View className="flex flex-row mt-8">
                        <Text className="font-semibold pb-2">Top Listas</Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        }}
                    >
                        {TopListas.map((style, index) => (
                        <SearchCards
                            key={index}
                            image={style.imgLink}
                            color={style.cor}
                            text={style.texto}
                        />
                        ))}
                    </ScrollView>

                    <View className="flex flex-row mt-8">
                        <Text className="font-semibold pb-2">Para Você</Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        }}
                    >
                        {ParaVoce.map((style, index) => (
                        <SearchCards
                            key={index}
                            image={style.imgLink}
                            color={style.cor}
                            text={style.texto}
                        />
                        ))}
                    </ScrollView>
                </View>
                
            </View>
        </ScrollView>
    );
}