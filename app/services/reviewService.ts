import { ref, push, query, orderByChild, equalTo, get  } from 'firebase/database';
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