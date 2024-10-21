import { getFirestore } from "firebase-admin/firestore";

import { ISongAnalysis } from "../../../../types/song.types";
import { ApiError, createApiError } from "../../types/error";

export const createSong = async ({
  songAnalysis,
  userId,
}: Readonly<{
  songAnalysis: ISongAnalysis;
  userId: string;
}>): Promise<ISongAnalysis | ApiError> => {
  if (!userId)
    return createApiError(
      "Create Song Analysis: userId is required",
      "create-song-analysis",
      400
    );

  const db = getFirestore();

  await db
    .collection("users")
    .doc(userId)
    .collection("songs")
    .doc(songAnalysis.id)
    .set(songAnalysis);

  return songAnalysis;
};
