import { ScrollView, Text, View } from "react-native";
import { Topicos } from "../moks/topicosPesquisa";
import SearchCards from "../components/SearchCards";
import Input from "../components/Input";
import { useState } from "react";
import SearchCardsAPI from "../components/SearchCardsAPI";
import { router } from "expo-router";

export default function InitialScreen(){
    const [textoPesquisa, setTextoPesquisa] = useState("");
    const [retPesquisa, setRetPesquisa] = useState<Album[]>([]);
    
    const topicos = Topicos;

    const EmAlta = topicos.slice(0, 2);
    const TopListas = topicos.slice(2, 6);
    const ParaVoce = topicos.slice(6, 8);

    const searchAlbums = async (texto: string) => {
        try {
          if (!texto) {
            setRetPesquisa([]);
            return;
          }
          const response = await fetch(`https://api.deezer.com/search/album?q=${texto}`);
          const data = await response.json();
          setRetPesquisa(data.data || []);
        } catch (e) {
          console.error("Erro ao buscar álbuns:", e);
        }
      };  
      
    const clickAlbum = (album: Album) => {
        router.push({
            pathname: "/components/album",
            params: { albumParametro: JSON.stringify(album) },
          });
    };

    return(
        <ScrollView >
            <View className="flex gap-3 m-4 mt-10 p-5">
                <Text className="font-semibold text-2xl flex-1 text-center mb-8">Pesquisa</Text>
                <Input
                    icon="magnify"
                    placeholder="Procure..."
                    classname="bg-light-gray w-full p-1 border-light-gray mb-8"
                    value={textoPesquisa}
                    onChangeText={(text) => {
                        setTextoPesquisa(text);
                        searchAlbums(text);
                    }}
                />
                <View>
                    {retPesquisa.length > 0 ? (
                        <ScrollView
                            contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            }}
                        >
                            {retPesquisa.slice(0, 20).map((album) => (
                                <SearchCardsAPI
                                    key={album.id}
                                    image={album.cover_medium}
                                    color="FFFFFF"
                                    text={album.title}
                                    artistName={album.artist.name}
                                    type={album.type}
                                    onPress={() => clickAlbum(album)}
                                />
                            ))}
                        </ScrollView>
                    ) : (
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
                    )}
                </View>
            </View>
        </ScrollView>
    );
}