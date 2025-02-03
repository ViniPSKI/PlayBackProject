export async function getAlbumReview (albumId: string) {
    try {
      const response = await fetch(`https://api.deezer.com/album/${albumId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados do álbum:", error);
      return null;
    }
}