import { ref, push, query, orderByChild, equalTo, get, limitToLast  } from 'firebase/database';
import { database } from '../../firebase';
import { Review } from '../interfaces/review';

export async function saveReview(reviewData: {
  albumId: string;
  rating: number;
  title: string;
  review: string;
  isFavorited: boolean;
  idUsuario: string;
}) {
  try {
    const reviewWithTimestamp = { ...reviewData, createdAt: new Date().toISOString() };
    const reviewRef = await push(ref(database, '/reviews'), reviewWithTimestamp);
    return { reviewId: reviewRef.key };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getReviewsUsuario(idUsuario: string) {
    try {
      const reviewsRef = ref(database, "/reviews");
      const userReviewsQuery = query(reviewsRef, orderByChild("idUsuario"), equalTo(idUsuario));
      const snapshot = await get(userReviewsQuery);
  
      if (snapshot.exists()) {
        const reviews = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...(value as Review),
        }));
        return reviews;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar reviews:", error);
      throw error;
    }
}

export async function getReviewsAlbum(idAlbum: number) {
  try {
    const reviewsRef = ref(database, "/reviews");
    const albumReviewsQuery = query(reviewsRef, orderByChild("albumId"), equalTo(idAlbum));
    const snapshot = await get(albumReviewsQuery);

    if (snapshot.exists()) {
      const reviews = Object.entries(snapshot.val()).map(([key, value]) => ({
        id: key,
        ...(value as Review),
      }));

      return reviews.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar reviews:", error);
    throw error;
  }
}

export async function getLastReviews(limit: number = 15) {
  try {
    const reviewsRef = ref(database, "/reviews");
    const recentReviewsQuery = query(reviewsRef, orderByChild("createdAt"), limitToLast(limit));
    const snapshot = await get(recentReviewsQuery);

    if (snapshot.exists()) {
      const reviews = Object.entries(snapshot.val()).map(([key, value]) => ({
        id: key,
        ...(value as Review),
      }));

      return reviews.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar reviews mais recentes:", error);
    throw error;
  }
}
