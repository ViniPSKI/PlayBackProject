import { Review } from "./review";

export interface ReviewCompleta extends Review {
    albumData?: {
      cover_medium: string;
      title: string;
      artist: {
        name: string;
      };
    };
    userData?: {
      nome: string;
      sobrenome: string;
    };
}