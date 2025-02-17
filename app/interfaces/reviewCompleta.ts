import { Review } from "./review";

export interface ReviewCompleta extends Review {
    albumData?: {
      id: number;
      cover_medium: string;
      title: string;
      artist: {
        name: string;
      };
      tracklist: string;
      type: string;
      nb_tracks: number;
    };
    userData?: {
      id?: string,
      nome: string;
      sobrenome: string;
    };
}