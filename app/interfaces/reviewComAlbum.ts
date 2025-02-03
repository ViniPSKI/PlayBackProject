import { Review } from "./review";

export interface ReviewComAlbum extends Review {
    albumData?: {
      cover_medium: string;
      title: string;
      artist: {
        name: string;
      };
    };
}