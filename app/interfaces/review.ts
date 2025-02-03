export interface Review{
    albumId: string;
    rating: number;
    title: string;
    review: string;
    isFavorited: boolean;
    idUsuario: string;
    createdAt:Date;
}